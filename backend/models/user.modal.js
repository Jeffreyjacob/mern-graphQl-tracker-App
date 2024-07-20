import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
     username:{
        type:String,
        required:true,
        unique:true
     },
     name:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     profilePicture:{
        type:String,
        default:""
     },
     gender:{
        type:String,
        enum:["male","false"]
     }
},{timestamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

const User = mongoose.model("user",userSchema)

export default User;