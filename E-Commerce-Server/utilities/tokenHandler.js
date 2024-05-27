export const tokenHandler = (user, res, message, statusCode) => {
    // Send JWT token to user
    const token = user.generateJWT();

    return res
        .status(statusCode)
        .cookie("token", token, {
            ...cookieOptions,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days in milliseconds
        })
        .json({success: true, message: message, token})
}

export const cookieOptions = {
    secure: process.env.NODE_ENV === "production",
    httpOnly: process.env.NODE_ENV === "development",
    sameSite: process.env.NODE_ENV === "development" ? false : "none",
}