import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

// CREATE NEW SESSION (Video + Chat)
export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res.status(400).json({ message: "Problem and Difficulty are required" });
    }

    // Generate a unique Stream video call ID
    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Create session record in MongoDB
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    // Create session in Stream (Video)
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    // Create chat channel for this session
    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} session`,
      created_by_id: clerkId,
      members: [clerkId],
    });

    await channel.create();

    res.status(201).json({ session });
    // TODO: Optionally send email notifications here
  } catch (error) {
    console.log("❌ Error in createSession Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// GET ALL ACTIVE SESSIONS
export async function getActiveSessions(_, res) {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.log("❌ Error in getActiveSessions Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// GET USER’S RECENT COMPLETED SESSIONS
export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id;

    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.log("❌ Error in getMyRecentSessions Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//  GET A SESSION BY ID
export async function getSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.status(200).json({ session });
  } catch (error) {
    console.log("❌ Error in getSessionById Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// JOIN AN EXISTING SESSION
export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    if(session.status != "active"){
      return res.status(400).json({message:"Cannot join a completed session"});
    }

    if(session.host.toString()=== userId.toString()){
      return res.status(400).json({message:"host cannot join there own session as the participate"});
    }

    //  Check if session already has a participant
    if (session.participant)
      return res.status(409).json({ message: "Session is full" });

    // Add current user as participant
    session.participant = userId;
    await session.save();

    // Add participant to Stream chat channel
    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    res.status(200).json({ session });
  } catch (error) {
    console.log("❌ Error in joinSession Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// END SESSION (Host Only)
export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    //  Only the host can end a session
    if (session.host.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Only the host can end the session" });
    }

    //  Prevent double-ending
    if (session.status === "completed") {
      return res.status(400).json({ message: "Session is already completed" });
    }

   

    //  Delete the video call
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    // Delete associated chat channel
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

     session.status = "completed";
    await session.save();

    res.status(200).json({ session, message: "Session ended successfully" });
  } catch (error) {
    console.log("❌ Error in endSession Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}





// import {chatClient, streamClient} from "../lib/stream.js";
// import Session from "../models/Session.js";


// export async function createSession(req,res) {

//     try {
//         const {problem, difficulty}=req.body
//         const userId=req.user._id
//         const clerkId =req.user.clerkId

//         if(!problem ||!difficulty){
//             return res.status(400).json({message:"Problem and Difficulty are required"})
//         }

//         //generate a unique call id for stream video

//         const callId=`session_${Date.now()}_${Math.random().toString(36).substring(7)}`
//         //create sessionn in db
//         const session = await Session.create(
//             {
//                 problem,
//                 difficulty,
//                 host:userId,
//                 callId
            
//             });

//             //createseesionin dtream
//             await streamClient.video.call("default",callId),getOrCreate({
//                 data:{
//                     created_by_id:clerkId,
//                     custom:{problem,difficulty,sessionId:session._id.toString()}
//                 },
//             });

//                 // chat messages 

//                const channel= chatClient.channel("messaging",callId,{
//                     name:`${problem}session`,
//                     created_by_id:clerkId,
//                     members:[clerId]
//                 });
//                 await channel.create()

//                 res.status(201).json({session});
//                 //todo send emails

//     } catch (error) {

//         console.log("Error in createSession Controllers",error.message);
//         res.status(500).json({messages:"Internal Server Error"});

        
//     }
    
// }

// export async function getActiveSessions(_,res) {

//     try {
//         await Session.find({status:"active"})
//         .populate("host","name profileImage email clerId ")
//         .sort({createdAt:-1})
//         .limit(20);

//         res.status(200).json({sessions})
        
//     } catch (error) {
//          console.log("Error in getActiveSession Controllers",error.message);
//         res.status(500).json({messages:"Internal Server Error"});

        
//     }
    
// }
// export async function getMyRecentSessions(req,res) {
//     try {
//         // where user is either host or participate
//         const userId=req.user._id

//         const sessions =await Session.find({
//             status:"completed",
//             $or:[{host:userId},{participant:userId}]
//         }).sort({createdAt:-1}).limit(20);

//         res.status(200).json({sessions});
//     } catch (error) {
//          console.log("Error in getMySession Controllers",error.message);
//         res.status(500).json({messages:"Internal Server Error"});
        
//     }

    
// }
// export async function getSessionsById(req,res) {
//     try {
//         const {id}=req.params

//         const session= await Session.findById(id)
//         .populate("host","name email profileImage clerkId")
//         .populate("participant","name email profileImage clerkId");

//         if(!session) return res.status(404).json({message:"session not found"});
//         res.status(200).json({session});
//     } catch (error) {
//          console.log("Error in getSessionById Controllers",error.message);
//         res.status(500).json({messages:"Internal Server Error"});
        
//     }
    
// }

// export async function joinSessions(req,res) {

//     try {
//         const {id}= req.params;
//         const userId=req.user._id
//         const clerId=req.user.clerkId

//         const session =await Session.findById(Id)
            
//         if(!session) return res.status(404).json({message:"Session not found"});
        
//         //check if session i  sfull or not 
//         if(session.participant) return res.status(404).json({message:"session is full"})
//         session.participant=userId
//         await session.save()
//         const channel=chatClient.channel("messaging", session.callId)
//         await channel.addMembers([clerId])

//         res.status(200).json({session})
//     } catch (error) {
//          console.log("Error in joinsession Controllers",error.message);
//         res.status(500).json({messages:"Internal Server Error"});
        
//     }
    
// }

// export async function endSessions(req,res) {
//     try {
//         const{id}=req.params
//         const userId=req.user._id

//         const session= await Session.findById(id)
//         if(!session) return res.status(404).json({message:"session not found"});

//         //check is user is the host

//         if(session.host.toString() != userId.toString()){
//             return res.status(403).json({messages:"only the host can end the session"})
//         }

//         //check is session is already completed
//         if(session.status==="completed"){
//             return res.status(400).json({message:"sesssion is already completed"});
//         }

//         session.status="completed"
//         await session.save()

//         //detele vide call
//         const call = streamClient.video.call("default",session.calledId)
//         await call.delete({hard:true})
//         res.status(200).json({session, message:"session ended sucessfully"});
    
//         //delete chat

//         const channel = chatClient.channel("messaging",session.called)
//         await channel.delete();
        
//     } catch (error) {
//          console.log("Error in endSession Controllers",error.message);
//         res.status(500).json({messages:"Internal Server Error"});

        
//     }
    
// }
