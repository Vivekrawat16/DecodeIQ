import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profileImage:{
        type:String,
        default:"",
    },
    title: { type: String, default: "" },
    bio: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    skills: { type: [String], default: [] },

    password: {
        type: String,
        required: function() {
            // Password is required only if local auth is used
            return this.authProvider === 'local';
        },
    },
    authProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local',
    },
},{timestamps:true}
);

const User= mongoose.model("User",userSchema);

export default User;