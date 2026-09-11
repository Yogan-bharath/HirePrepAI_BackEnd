const jwt = require("jsonwebtoken");
const tokenBlockListMModel = require("../models/tokenBlackList.model");

async function authUser(req, res, next) {

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not Provided"
            });
        }

        const isInBlockList = await tokenBlockListMModel.findOne({ token });

        if (isInBlockList) {
            return res.status(401).json({
                message: "Invalid Token"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_KEY
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.log("Auth Error:", error);

        return res.status(401).json({
            message: "Invalid Token"
        });
    }
}

module.exports = { authUser };