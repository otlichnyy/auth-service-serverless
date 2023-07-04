import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as service from "../service/cognito";

export const signup = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userAttr = [{ Name: "email", Value: email }];
    console.log({ email, password, userAttr });
    const data = await service.signUp(email, password, userAttr);
    console.log(data);
    res.send(data);
});

export const confirm = catchAsync(async (req: Request, res: Response) => {
    const { email, code } = req.body;
    const data = await service.confirm(email, code);
    console.log(data);
    res.send(data);
});

export const resendConfirmationCode = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    const data = await service.resendConfirmationCode(email);
    res.send(data);
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const data = await service.login(email, password);
    res.send(data);
});

export const refreshTokens = catchAsync(async (req: Request, res: Response) => {
    const { email, refreshToken } = req.body;
    const tokens = await service.refreshTokens(email, refreshToken);
    res.send(tokens);
});

export const forgot = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    const data = await service.forgot(email);
    res.send(data);
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { email, password, code } = req.body;
    const data = await service.resetPassword(email, password, code);
    res.send(data);
});
