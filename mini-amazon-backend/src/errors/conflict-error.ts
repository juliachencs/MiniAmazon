import { HttpError } from "./http-error.js";

export class HttpConfilctError extends HttpError {
    constructor(message: string = 'Conflict') {
        super(message, 409);
    }
}