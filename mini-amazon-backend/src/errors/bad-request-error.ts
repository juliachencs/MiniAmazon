import { HttpError } from "./http-error.js";

export class HttpBadRequestError extends HttpError {
    constructor(message: string = 'Bad Request') {
        super(message, 400);
    }
}