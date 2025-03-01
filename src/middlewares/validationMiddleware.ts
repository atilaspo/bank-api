import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";

/**
 * Middleware to handle validation errors.
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((err: ValidationError) => ({
                field: "param" in err ? err.param : "unknown",
                message: err.msg
            }))
        });
    }
    next();
};