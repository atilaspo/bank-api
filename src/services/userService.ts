import { UserModel } from "../models/userModel";
import { findUserById, findUserByEmail, createUser } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Registers a new user.
 */
export const registerUser = async (email: string, password: string, role: "user" | "admin"): Promise<UserModel | string> => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return "Email already in use";

    const hashedPassword = await bcrypt.hash(password, 10);
    return await createUser(email, hashedPassword, role);
};

/**
 * Finds a user by ID.
 */
export const getUserById = async (id: number): Promise<UserModel | null> => {
    return await findUserById(id);
};

/**
 * Logs in a user and returns a JWT token.
 */
export const loginUser = async (email: string, password: string): Promise<string | { token: string }> => {
    const user = await findUserByEmail(email);
    if (!user) return "Invalid email or password";

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return "Invalid email or password";

    // Generate JWT Token
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Expiration time
    );

    return { token };
};
