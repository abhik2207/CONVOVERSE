// Function to send a formatted success response
const sendResponse = (res, data, msg, success, code) => {
    // Creating a response object with specified properties
    const responseObj = {
        responseData: data,
        message: msg,
        success: success,
        responseCode: code
    }
    // Sending the response in JSON format
    res.format({
        json: () => {
            res.send(responseObj);
        }
    })
}

// Function to send a formatted error response
const sendError = (res, data, msg) => {
    // Calling the sendResponse function with default error values
    sendResponse(res, data, msg || "Request failed!", false, 400);
}

export { sendResponse, sendError };