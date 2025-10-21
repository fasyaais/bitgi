
export const successResponse = (res, data, message,statusCode= 200) => {
    return res.status(statusCode).json({
        status: 'success',
        message,
        data,
    });
}

export const errorResponse = (res, message, statusCode= 500) => {
    return res.status(statusCode).json({
        status: 'error',
        message,
    });
}
