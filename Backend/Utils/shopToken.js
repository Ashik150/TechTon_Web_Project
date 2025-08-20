export const sendShopToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    res.status(statusCode).cookie("seller_token", token, options).json({
        success: true,
        user,
        token,
    });
};