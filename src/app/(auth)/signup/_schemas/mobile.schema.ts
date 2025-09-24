import { z } from 'zod';

export const mobileSchema = z.object({
    mobile_number: z
        .string()
        .min(1, { message: 'شماره موبایل الزامی است' })
        .regex(/^09[0-9]{9}$/, {
            message: 'شماره موبایل صحیح نیست',
        }),
});

export type Mobile = z.infer<typeof mobileSchema>;

export type UserSession = {
    token: string;
};
