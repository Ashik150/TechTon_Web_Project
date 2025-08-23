import { Conversation } from "../models/conversation.model.js";
import ErrorHandler from '../Utils/ErrorHandler.js';

export const createConversation = async (req, res, next) => {
    try {
        const { groupTitle, userId, sellerId } = req.body;

        const isConversationExist = await Conversation.find({ groupTitle });
        if (isConversationExist) {
            const conversation = isConversationExist;
            res.status(201).json({
                success: true,
                conversation,
            });
        } else {
            const conversation = await Conversation.create({
                members: [userId, sellerId],
                groupTitle: groupTitle,
            });

            res.status(201).json({
                success: true,
                conversation,
            });
        }
    } catch (error) {
        return next(new ErrorHandler(error.response.message), 500);
    }
}

export const getConversationSeller = async (req, res, next) => {
    try {
        const conversations = await Conversation.find({
            members: {
                $in: [req.params.id],
            },
        }).sort({ updatedAt: -1, createdAt: -1 });

        res.status(201).json({
            success: true,
            conversations,
        });
    } catch (error) {
        return next(new ErrorHandler(error), 500);
    }
}