import { HttpError } from "./http-error.js";

export class HttpNotFoundError extends HttpError {
    constructor(message: string = 'Not found') {
        super(message, 404);
    }
}