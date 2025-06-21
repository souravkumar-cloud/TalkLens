import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    bio:{
        type:String,
        default:"Hey there! I am using TalkLens",
    },
    profilePic:{
        type:String,
        default:"",
    },
    nativeLanguage:{
        type:String,
        default:"",
    },
    learningLanguage:{
        type:String,
        default:"",
    },
    location:{
        type:String,
        default:"",
    },
    isOnboraded:{
        type:Boolean,
        default:false,
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],


},{timestamps:true});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(err){
        console.error(`Error hashing password: ${err.message}`);
        next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        return await bcrypt.compare(candidatePassword, this.password);
    }
    catch(err){
        console.error(`Error comparing password: ${err.message}`);
        throw err;
    }
}

const User = mongoose.model("User",userSchema);


export default User; 