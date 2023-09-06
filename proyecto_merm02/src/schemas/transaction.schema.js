import { z } from 'zod'

export const transactionSchema = z.object({
    amount: z.number({
        required_error: 'Amount is required'
    }),
    description: z.string({
        required_error: 'Description must be a string'
    }),
    date: z.string().datetime().optional()
})