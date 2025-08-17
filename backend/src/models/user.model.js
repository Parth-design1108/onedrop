import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    userName : {
        type: String,
        unique : true,
        required: true,
    },
    email:{
        type : String,
        required : true,
        unique: true,
    },
    password :{
        type : String,
        required : true
    },
    userImage : {
        type : String,
        default : "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_800,q_50/lsci/db/PICTURES/CMS/404600/404697.6.jpg" 
    }
}, {timestamps : true})

const User = mongoose.model('User', userSchema);

export default User;