import z from 'zod';

export const zodTimeSchema = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid format (use HH:MM)");