import { HttpError } from "./http-error.js";

export class HttpUnauthorizedError extends HttpError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}