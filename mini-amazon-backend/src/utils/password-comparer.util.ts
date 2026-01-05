export function comparePassword(reqPassword: string, userPassword: string): boolean {
    // TODO
    // later we should not store actual password but password's hash
    // and comparation function will change accordingly
    return reqPassword === userPassword;
}