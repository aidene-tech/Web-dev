"use server";

export async function verifyPassword(password: string) {
    const correctPassword = process.env.ADMIN_PASSWORD;
    // Fallback for development if env is not set, but ideally should be set
    if (!correctPassword) {
        console.warn("ADMIN_PASSWORD is not set in environment variables");
        return false;
    }
    return password === correctPassword;
}
