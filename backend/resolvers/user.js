import { users } from "../dummyData/data.js"
import Transaction from "../models/transaction.modal.js"
import User from "../models/user.modal.js"


const userResolver = {
    Mutation:{
     signUp:async(_,{input},context)=>{
        try{
         const {username,name,password,gender} = input
         if(!username ||!name||!password||!gender){
            throw new Error("All fields are required")
         }
         const existingUser = await User.findOne({username});
         if(existingUser){
            throw new Error("User already exist")
         }
         const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
         const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
         const user = new User({
            username,
            name,
            password,
            gender,
            profilePicture:gender === "male" ? boyProfilePic : girlProfilePic
         })
         await user.save();
         await context.login(user)
         return user;
        }catch(error){
            console.error("Error is signUp",err);
            throw new Error(error.message || "Internal server error")
        }
     },
     login:async(_,{input},context)=>{
      try{  
        const {username,password} = input;
        const {user} = await context.authenticate("graphql-local",{username,password})
        await context.login(user);
        return user
      }catch(error){
        console.error("Error is login",err);
        throw new Error(error.message || "Internal server error")
      }
     },
     logout:async(_,__,context)=>{
       try{
         await context.logout();
         context.req.session.destroy((err)=>{
            if(err) throw err;
         })
         context.res.clearCookie("connect.sid");
         return {message:"Logged out successfully"};
       }catch(error){
        console.error("Error is logout",err);
        throw new Error(error.message || "Internal server error")
       }
     }
    },
    Query:{
        authUser:async(_,__,context)=>{
            try{
               const user = await context.getUser()
               return user
            }catch(error){
               console.error("Error is authUser",error);
               throw new Error("Internal server error")
            }
        },
        user:async (_,{userId})=>{
            try{
             const user = await User.findById(userId);
             return user
            }catch(error){
              console.error("Error in user query",error);
              throw new Error(error.message || "Error getting user")
            }
        }
    },
    User:{
        transactions:async (parent)=>{
            try{
             const transactions = await Transaction.find({userId:parent._id})
             return transactions;
            }catch(error){
              console.log("Error in user.transaction resolver",error);
              throw new Error(error.message || "Internal server error");
            }
        }
    }
}

export default userResolver