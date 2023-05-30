const jwt = require("jsonwebtoken");

const accessTokenSecretKey = "jnsWx41kDK";

function generateAccessToken(userPayload) {
    return jwt.sign(userPayload, accessTokenSecretKey, {
        subject: userPayload.email,
        expiresIn: "3h",
    });
}

module.exports = generateAccessToken;