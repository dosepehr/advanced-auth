import { z } from 'zod';

const MobileSchema = z
    .string()
    .trim()
    .length(11, { message: 'شماره موبایل باید 11 رقم باشد' })
    .startsWith('09', { message: 'شماره موبایل باید با 09 شروع شود' });

const PasswordSchema = z
    .string()
    .trim()
    .min(8, { message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' })
    .max(32, { message: 'رمز عبور نباید بیشتر از ۳۲ کاراکتر باشد' });

export const SignInSchema = z.object({
    username: MobileSchema,
    password: PasswordSchema,
});

export type SignInDTO = z.infer<typeof SignInSchema>;
