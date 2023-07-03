class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public isOperational: boolean = true,
        public stack: string = ""
    ) {
        super(message);
        this.name = "ApiError";
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
