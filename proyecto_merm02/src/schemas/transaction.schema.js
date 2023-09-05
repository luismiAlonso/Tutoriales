import { z } from 'zod'

export const transactionSchema = z.object({
    amoiunt: z.number({
        required_error: 'Amount is required'
    }),
    description: z.string({
        required_error: 'Description must be a string'
    }),
    date: z.string().datetime().optional()
})