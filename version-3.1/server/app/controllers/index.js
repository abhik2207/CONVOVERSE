import UserModel from "../models/users.js";
import ChannelModel from "../models/channels.js";
import { sendResponse, sendError } from "../../utility/index.js";

export const createUser = async (req, res) => {
    const userObj = new UserModel(req.body);
    await userObj.saveData();
    sendResponse(res, userObj, "User created successfully!", true, 200);
};

export const loginUser = async (req, res) => {
    const requestData = req.body;
    const isUserExist = await UserModel.findOneData({
        phoneNumber: requestData.phoneNumber,
        password: requestData.password
    });
    // delete isUserExist.password;
    if (!isUserExist) {
        return sendError(res, {}, "User not found with those credentials!");
    }
    sendResponse(res, isUserExist, "User logged in successfully!", true, 200);
};

export const createChannel = async (req, res) => {
    const channelObj = new ChannelModel(req.body);
    await channelObj.saveData();
    sendResponse(res, channelObj, "Channel created successfully!", true, 200);
};

export const getChannels = async (req, res) => {
    const requestData = req.query;
    const channelList = await ChannelModel.findData({
        "channelUsers._id": requestData.userId
    });
    sendResponse(res, channelList, "Channel list fetched successfully!", true, 200);
};

export const searchUser = async (req, res) => {
    const requestData = req.query;
    const isUserExist = await UserModel.findOneData({
        phoneNumber: requestData.phone
    });
    if (!isUserExist) {
        return sendError(res, {}, "No user found!");
    }
    sendResponse(res, isUserExist, "User found successfully!", true, 200);
};

export const sendMessage = async (req, res) => {
    const requestData = req.body;
    await ChannelModel.findOneAndUpdateData(
        { _id: requestData.channelId },
        { $push: { messages: requestData.messages } }
    );
    sendResponse(res, {}, "Message sent successfully!", true, 200);
};