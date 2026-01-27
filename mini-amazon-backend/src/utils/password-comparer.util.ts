import bcrypt from 'bcrypt'

export async function comparePassword(reqPassword: string, userPasswordHash: string): Promise<boolean> {
    // TODO
    // later we should not store actual password but password's hash
    // and comparation function will change accordingly
    return bcrypt.compare(reqPassword, userPasswordHash);
}