import { z } from 'zod'
import validator from 'validator'

export const createTransactionSchema = z.object({
    user_id: z.string().uuid(),
    name: z
        .string({
            message: (issue) =>
                issue.input === undefined ? 'name is requared' : 'not a string',
        })
        .trim()
        .min(1, {
            message: 'name is required',
        }),
    date: z.coerce.date({
        message: 'date is requared',
    }),
    amount: z
        .number()
        .min(1, {
            message: 'Amount must be greater than 0.',
        })
        .refine((value) => {
            return (
                validator.isCurrency(value.toString(), {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                }),
                {
                    message:
                        'Amount must be a valid currency value (ex: 10.00).',
                }
            )
        }),
    type: z.enum(['EARNING', 'EXPONSE', 'INVESTMENT']),
})
