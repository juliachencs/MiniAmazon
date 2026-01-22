import { HttpError } from "./http-error.js";

export class HttpForbiddenError extends HttpError {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }
}