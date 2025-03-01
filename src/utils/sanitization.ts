import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes user input to prevent XSS and removes invalid characters.
 * @param input The string to sanitize
 * @returns A sanitized version of the string or null if invalid
 */
export const sanitizeInput = (input: string): string | null => {
    // Remove HTML tags and attributes
    const clean = sanitizeHtml(input, {
        allowedTags: [], // ❌ Blocks all HTML tags
        allowedAttributes: {} // ❌ Blocks all attributes
    });

    // Check if the sanitized string is still valid
    if (!clean || clean.trim().length === 0) {
        return null; // Reject empty or fully sanitized input
    }

    return clean;
};