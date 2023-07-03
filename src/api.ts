import "source-map-support/register";
import serverless from "serverless-http";
import express from "express";
import httpStatus from "http-status";
import ApiError from "./utils/ApiError";
import { customErrorHandler, errorConvertor } from "./middleware/Error";

// initialize the express app
const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get("/", async (_, res) => {
    return res.status(200).json({
        message: "Hello from root!",
        cognitoIssuer: process.env.COGNITO_ISSUER_URL || ""
    });
});

app.get("/path", (_, res) => {
    return res.status(200).json({
        message: "Hello from path!"
    });
});

app.get("/error", () => {
    // proper source-map-support
    throw new Error("MEH!!");
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert any other Error type to APIError
app.use(errorConvertor);

// handle error
app.use(customErrorHandler);

module.exports.handler = serverless(app);
