import { cognitoClient, cognitoClientId, cognitoUserPoolId, hashSecret } from "./client";

/**
 * Signup user
 * @param username a unique string, here we're using email as username
 * @param password a constrainst satisfying string
 * @param userAttr a set of attribute including email that are part of user identity
 */
export const signUp = async (username: string, password: string, userAttr: Array<any>) => {
    const params = {
        ClientId: cognitoClientId,
        Username: username,
        Password: password,
        SecretHash: hashSecret(username),
        UserAttributes: userAttr
    };

    try {
        const data = await cognitoClient.signUp(params).promise();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

/**
 * Confirm signed up user, code is send to registered email
 * @param username , here username is email
 * @param code
 * @returns
 */
export const confirm = async (username: string, code: string) => {
    const params = {
        ClientId: cognitoClientId,
        ConfirmationCode: code,
        Username: username,
        SecretHash: hashSecret(username)
    };

    try {
        await cognitoClient.confirmSignUp(params).promise();
        return { username, confirm: true };
    } catch (error) {
        console.error(error);
        throw new Error(`error: ${error.code}`);
    }
};

/**
 * resend the confirmation code, in case of expiration
 * @param username, here username is email
 * @returns
 */
export const resendConfirmationCode = async (username: string) => {
    const params = {
        ClientId: cognitoClientId,
        Username: username,
        SecretHash: hashSecret(username)
    };

    try {
        const data = await cognitoClient.resendConfirmationCode(params).promise();
        console.log(`Confirmation code resent successfully to user: ${username}`);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

/**
 * login user, using `ADMIN_USER_PASSWORD_AUTH`
 * @param username , here username is email
 * @param password
 * @returns object of accessToken, refreshToken and IdToken
 */
export const login = async (username: string, password: string) => {
    const params = {
        UserPoolId: cognitoUserPoolId,
        ClientId: cognitoClientId,
        AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
            SECRET_HASH: hashSecret(username)
        }
    };

    try {
        const data = await cognitoClient.adminInitiateAuth(params).promise();
        console.log(`User ${username} logged in successfully.`);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

/**
 * refresh tokens - Access and Id token, after expirations of token
 * @param username
 * @param refreshToken
 * @returns object of accessToken and idToken
 */
export const refreshTokens = async (username: string, refreshToken: string) => {
    const params = {
        UserPoolId: cognitoUserPoolId,
        ClientId: cognitoClientId,
        AuthFlow: "REFRESH_TOKEN_AUTH",
        AuthParameters: {
            REFRESH_TOKEN: refreshToken,
            SECRET_HASH: hashSecret(username)
        }
    };

    try {
        const data = await cognitoClient.adminInitiateAuth(params).promise();
        console.log(`Tokens refreshed successfully for user: ${username}`);
        return data.AuthenticationResult; // Return refreshed tokens
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

/**
 * forgot user password - request to cognito
 * @param username , here username is email
 * @returns
 */
export const forgot = async (username: string) => {
    const params = {
        ClientId: cognitoClientId,
        Username: username,
        SecretHash: hashSecret(username)
    };

    try {
        const data = await cognitoClient.forgotPassword(params).promise();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

/**
 * reset new password
 * @param username
 * @param password
 * @param code
 * @returns
 */
export const resetPassword = async (username: string, password: string, code: string) => {
    const params = {
        ClientId: cognitoClientId /* required */,
        ConfirmationCode: code /* required */,
        Password: password /* required */,
        Username: username /* required */,
        SecretHash: hashSecret(username)
    };

    try {
        const data = await cognitoClient.confirmForgotPassword(params).promise();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};
