# Authentication Service

This is a robust, serverless authentication service that uses AWS Cognito for handling user authentication. It's built using Serverless Framework, AWS Lambda, and Express.js.

## Features

This service provides the following REST API endpoints for user authentication:

- `/signup` - Register a new user
- `/confirm` - Confirm a new user registration
- `/resend-confirm` - Resend the confirmation code to the user's email
- `/login` - Authenticate a user
- `/forgot` - Request a user password reset
- `/reset-password` - Reset a user's password
- `/refresh` - Refresh a user's authentication tokens

## Installation

1. Install Serverless globally

```bash
npm install -g serverless
```

2. Clone the repository:

```bash
git clone https://github.com/otlichnyy/auth-service-serverless.git
cd repo
```

3. Install dependencies:

```bash
npm install
```

4. Deploy the service:

```bash
npm run deploy
```

## Usage

The API endpoints can be invoked using any HTTP client like curl or Postman. Here are some examples:

- **Signup**

```bash
POST /signup
{
    "email": "test@example.com",
    "password": "yourpassword"
}
```

- **Confirm Signup**

```bash
POST /confirm
{
    "email": "test@example.com",
    "code": "123456"
}
```

## Running Tests

To run tests, use the following npm script:

```bash
npm test
```

## Linting

This service uses ESLint and Prettier for code formatting and consistency. Run the linter with:

```bash
npm run lint
```

## Deployment

To deploy this service to your AWS account, you need to set up your AWS credentials either by setting up the AWS CLI or by adding the access key and secret key to a `.env` file in the root of the project.

Then run:

```bash
npm run deploy
```

## Cleanup

To delete the service from your AWS account, run:

```bash
npm run destroy
```

## Contributions

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
