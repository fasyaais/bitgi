import { loginService, registerService } from "../services/authService.js";

export const registerController = async (req,res) => {
    try {
        const user = registerService(req.body)
        return res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
    const {fullname, username,password} = req.body;
    return res.status(200).json({
        status: 'success',
        data: req.body,
    });
}

export const loginController = async (req,res) => {
    try {
        const user = loginService(req.body)
        return res.status(200).json({
            status: 'success',
            data: req.body,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error
        });
    }
}