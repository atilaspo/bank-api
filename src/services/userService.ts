import { UserModel } from "../models/userModel";
import { findUserById, findUserByEmail, createUser } from "../repositories/userRepository";
import bcrypt from "bcrypt";

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
