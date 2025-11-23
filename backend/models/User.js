import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true }, 
  password: { type: String, required: true },            
  createdAt: { type: Date, default: Date.now }
});

//MIDDLEWARE(Hook) para criptografar a senha antes de salvar
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.model("User", UserSchema);
