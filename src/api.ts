import "source-map-support/register";
import serverless from "serverless-http";
import express from "express";
import httpStatus from "http-status";
import ApiError from "./utils/ApiError";
import { customErrorHandler, errorConvertor } from "./middleware/Error";
import * as controller from "./controller/cognito";

// initialize the express app
const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.post("/signup", controller.signup);
app.post("/confirm", controller.confirm);
app.post("/resend-confirm", controller.resendConfirmationCode);
app.post("/login", controller.login);
app.post("/forgot", controller.forgot);
app.post("/reset-password", controller.resetPassword);
app.post("/refresh", controller.refreshTokens);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert any other Error type to APIError
app.use(errorConvertor);

// handle error
app.use(customErrorHandler);

module.exports.handler = serverless(app);
