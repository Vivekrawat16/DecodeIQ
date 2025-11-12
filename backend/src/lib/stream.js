import {StreamChat} from "stream-chat";
import {StreamClient} from "@stream-io/node-sdk";
import { ENV } from "./env.js" ;

const apikey=ENV.STREAM_API_KEY
const apiSecret=ENV.STREAM_API_SECRET

if(!apikey || !apiSecret){
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient= StreamChat.getInstance(apikey,apiSecret); //this is used for chat features
export const streamClient=new StreamClient(apikey,apiSecret);  // this is for video calls


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

