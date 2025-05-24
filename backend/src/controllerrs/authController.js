import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils/index.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User data" });
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCOrrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCOrrect) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
        message:"logged out successfully"
    })
  } catch (error) {
    console.log("error in logout controller", error.message);
  }
};


export const updateProfile = async (req,res)=> {
    try{
        const {profilePic} =req.body;
        const userId = req.user._id; // to know the user by user id 

        if(!profilePic){
          return res.status(400).jsoN({
            message:"Profile pic is required"
          })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic: uploadResponse.secure_url},{new:true})
        
        res.status(200).json(updatedUser);
        
    }catch(error){
           console.log("error in update profile", error);
           res.status(500).json({
            message:"Internal server error"
           })
    }
}

export const checkAuth = async (req,res)=>{
    try{
      res.status(200).json(req.user);

    }catch(error){
      console.log("errro in checkauth controller",error.message)
      res.status(500).json({
        message:"Internal server errror"
      })
    }
}