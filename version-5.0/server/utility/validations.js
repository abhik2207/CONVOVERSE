import { sendError } from "./index.js";
import * as yup from "yup";

// Validation middleware for creating a user
export const validateCreateUser = async (req, res, next) => {
    const schema = yup.object().shape({
        phoneNumber: yup.number().required(),
        name: yup.string().min(3, 'Name must be at least 3 characters!').required(),
        password: yup.string().min(8, 'Password must be at least 8 characters!').required(),
        profilePic: yup.string().url()
    });
    await validate(schema, req.body, res, next);
};

// Validation middleware for user login
export const validateLogin = async (req, res, next) => {
    const schema = yup.object().shape({
        phoneNumber: yup.number().required(),
        password: yup.string().required()
    });
    await validate(schema, req.body, res, next);
};

// Validation middleware for creating a channel
export const validateCreateChannel = async (req, res, next) => {
    const schema = yup.object().shape({
        channelUsers: yup.array().of(
            yup.object().shape({
                _id: yup.string().required(),
                name: yup.string().required(),
                profilePic: yup.string()
            })
        ).length(2).required()
    });
    await validate(schema, req.body, res, next);
};

// Validation middleware for getting channels
export const validateGetChannels = async (req, res, next) => {
    const schema = yup.object().shape({
        userId: yup.string().required()
    });
    await validate(schema, req.query, res, next);
};

// Validation middleware for searching for a user
export const validateSearchUser = async (req, res, next) => {
    const schema = yup.object().shape({
        phone: yup.number().required()
    });
    await validate(schema, req.query, res, next);
};

// Validation middleware for adding a message to a channel
export const validateAddMessage = async (req, res, next) => {
    const schema = yup.object().shape({
        channelId: yup.string().required(),
        messages: yup.object().shape({
            senderID: yup.string().required(),
            message: yup.string().required()
        })
    });
    await validate(schema, req.body, res, next);
};

// Common validation function used by other validation middlewares
const validate = async (schema, reqData, res, next) => {
    try {
        await schema.validate(reqData, { abortEarly: false });
        next();
    }
    catch (e) {
        const errors = e.inner.map(({ path, message, value }) => ({
            path,
            message,
            value
        }));
        sendError(res, errors, "Invalid request!");
    }
};