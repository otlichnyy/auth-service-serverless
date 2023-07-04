import AWS from "aws-sdk";
import crypto from "node:crypto";

export const cognitoConfig = { region: "us-east-1" };

export const cognitoUserPoolId = process.env.COGNITO_USER_POOL_ID;
if (!cognitoUserPoolId) throw new Error("Missing COGNITO_USER_POOL_ID");

export const cognitoClientSecret = process.env.COGNITO_CLIENT_SECRET;
if (!cognitoClientSecret) throw new Error("Missing COGNITO_CLIENT_SECRET");

export const cognitoClientId = process.env.COGNITO_CLIENT_ID || "";
if (!cognitoClientId) throw new Error("Missing COGNITO_CLIENT_ID");

export const cognitoClient = new AWS.CognitoIdentityServiceProvider(cognitoConfig);

// util
export const hashSecret = (username: string) => {
    return crypto
        .createHmac("SHA256", cognitoClientSecret)
        .update(username + cognitoClientId)
        .digest("base64");
};
