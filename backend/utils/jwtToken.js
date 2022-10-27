const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken() // getting token from userSchema method

    // creating options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24*60*60*1000
        ),
        // httpOnly: true
    }

    // sending cookie as an additional response with key named token and its value
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    })
}

module.exports = sendToken