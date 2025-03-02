import { UserModel } from "../models/userModel";

/**
 * Finds a user by ID.
 */
export const findUserById = async (id: number): Promise<UserModel | null> => {
    return await UserModel.findByPk(id);
};

/**
 * Finds a user by email.
 */
export const findUserByEmail = async (email: string): Promise<UserModel | null> => {
    return await UserModel.findOne({ where: { email } });
};

/**
 * Creates a new user.
 */
export const createUser = async (email: string, password: string, role: "user" | "admin"): Promise<UserModel> => {
    return await UserModel.create({ email, password, role });
};
