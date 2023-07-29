import { Request, Response } from "express";

import Theme from "../models/Theme";
import User from "../models/User";

export const setTheme = async (request: Request, response: Response) => {
    const { theme } = request.body;
    const { user } = response.locals;

    try {
        await User.update({ theme }, { returning: true, where: { id: user.id } });

        response.status(201).json({ success: true });
    } catch (error) {
        response.status(500).json({ error: "Failed to set theme" });
    }
};

export const getTheme = async (request: Request, response: Response) => {
    const userId = request.params["userId"];

    try {
        const theme = await Theme.findOne({
            where: { userId: userId }
        });

        response.status(201).json({ theme });
    } catch (error) {
        response.status(500).json({ error: "Failed to get theme" });
    }
};
