export class HttpError extends Error {
    public readonly statusCode: number;

    constructor(
        message: string,
        statusCode: number
    ) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class HttpBadRequestError extends HttpError {
    constructor(message: string = 'Bad Request') {
        super(message, 400);
    }
}

export class HttpUnauthorizedError extends HttpError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}

export class HttpForbiddenError extends HttpError {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }
}

export class HttpNotFoundError extends HttpError {
    constructor(message: string = 'Not found') {
        super(message, 404);
    }
}

export class HttpConfilctError extends HttpError {
    constructor(message: string = 'Conflict') {
        super(message, 409);
    }
}