const User = require("../models/User")
const express = require('express');

const createUser = async(req, res)=>{
    try {
        let success = false;
        const {name, email, phoneNo, photoUrl, emailverified, isDeleted, providerType, firebaseUserId, creationTime, lastSignInTime} = req.body;
        const users = {};
        if(name){users.name = name};
        if(email){users.email = email};
        if(phoneNo){users.phoneNo = phoneNo}
        if(photoUrl){users.photoUrl = photoUrl}
        if(emailverified){users.emailverified = emailverified}
        if(isDeleted){users.isDeleted = isDeleted}
        if(providerType){users.providerType = providerType}
        if(firebaseUserId){users.firebaseUserId = firebaseUserId}
        if(creationTime){users.creationTime = creationTime}
        if(lastSignInTime){users.lastSignInTime = lastSignInTime}
        const x = await User.findOne({email: users.email});
        if(x){
            let updateUser = await User.findByIdAndUpdate(x._id, {$set: users}, {new: true});
            return res.status(400).json({success, error: "User already exists"})
        }
        const user = await User.create({
            name: users.name,
            email: users.email,
            phoneNo: users.phoneNo,
            photoUrl: users.photoUrl,
            emailverified: users.emailverified,
            isDeleted: users.isDeleted,
            providerType: users.providerType,
            firebaseUserId: users.firebaseUserId,
            creationTime: users.creationTime,
            lastSignInTime: users.lastSignInTime,
        });
        console.log("Hello", user)
        success = true;
        res.status(200).json({success, message: "User created successfully"});
    } catch (error) {
        res.status(400).json({success: false, error: "Something went wrong", message: error.message});
    }
}

const loginUser = async(req, res)=>{
    try {
        let success = false;
        const {name, email, phoneNo, photoUrl, emailverified, isDeleted, providerType, firebaseUserId, creationTime, lastSignInTime} = req.body;
        const users = {};
        if(name){users.name = name};
        if(email){users.email = email};
        if(phoneNo){users.phoneNo = phoneNo}
        if(photoUrl){users.photoUrl = photoUrl}
        if(emailverified){users.emailverified = emailverified}
        if(isDeleted){users.isDeleted = isDeleted}
        if(providerType){users.providerType = providerType}
        if(firebaseUserId){users.firebaseUserId = firebaseUserId}
        if(creationTime){users.creationTime = creationTime}
        if(lastSignInTime){users.lastSignInTime = lastSignInTime}
        const x = await User.findOne({email: users.email});
        if(!x){
            return res.status(400).json({success, error: "Invalid credentials"});
        }
        let updateUser = await User.findByIdAndUpdate(x._id, {$set: users}, {new: true});
        success = true;
        res.status(200).json({success, message: "User created successfully"});
    } catch (error) {
        res.status(400).json({success: false, error: "Something went wrong", message: error.message});
    }
}

const getUserDetails = async(req, res)=>{
    res.send("User Details")
}

module.exports = {createUser, loginUser, getUserDetails};