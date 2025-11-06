import { z } from 'zod'

export const createUserSchema = z.object({
    first_name: z
        .string({
            message: (issue) =>
                issue.input === undefined
                    ? 'first name is required'
                    : 'Not a string',
        })
        .trim()
        .min(1, {
            message: 'first name is required',
        }),
    last_name: z
        .string({
            message: (issue) =>
                issue.input === undefined
                    ? 'last name is required'
                    : 'Not a string',
        })
        .trim()
        .min(1, {
            message: 'last name is required',
        }),
    email: z
        .email({
            message: (issue) =>
                issue.input === undefined
                    ? 'email is required'
                    : 'Please provide a valid email',
        })
        .trim(),
    password: z
        .string({
            message: (issue) =>
                issue.input === undefined
                    ? 'password is required'
                    : 'Not a string',
        })
        .trim()
        .min(6, {
            message: 'Password must have at least 6 characters.',
        }),
})
