import {StreamChat} from "stream-chat"
import { ENV } from "./env.js" 

const apikey=ENV.STREAM_API_KEY
const apiSecret=ENV.STREAM_API_SECRET

if(!apikey || !apiSecret){
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient= StreamChat.getInstance(apikey,apiSecret);

export const upsertStreamUser =async(userData) =>{
    try{
        await chatClient.upsertUser(userData);
        console.log("stream upserted successs")
    }catch (error){
    console.error("Error upserting Stream user",error);
    }
}

export const deleteStreamUser =async(userId) =>{
    try{
        await chatClient.deleteUsers(userId)
        console.log("Stream user deleted",userId);
    }catch (error){
    console.error("Error upserting Stream user",error);
    }
}

