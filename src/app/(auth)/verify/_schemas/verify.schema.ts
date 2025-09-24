import z from 'zod';
import { mobileSchema } from '../../signup/_schemas/mobile.schema';

export const verifySchema = mobileSchema.extend({
    otp: z.string().regex(/^\d{6}$/, {
        message: 'کد تایید باید ۶ رقمی باشد',
    }),
});

export type VerifyDTO = z.infer<typeof verifySchema>;
