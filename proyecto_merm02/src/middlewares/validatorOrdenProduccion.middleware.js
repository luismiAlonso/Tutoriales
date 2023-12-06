import { z } from 'zod';

export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors.map(err => err.message), requestBody: req.body
         });
        }

        console.error('Error al validar:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
