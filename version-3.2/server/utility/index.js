const sendResponse = (res, data, msg, success, code) => {
    const responseObj = {
        responseData: data,
        message: msg,
        success: success,
        responseCode: code
    }
    res.format({
        json: () => {
            res.send(responseObj);
        }
    })
}

const sendError = (res, data, msg) => {
    sendResponse(res, data, msg || "Request failed!", false, 400);
}

export { sendResponse, sendError };