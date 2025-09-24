'use server';
import api from '@/utils/api';
import { Mobile } from '../_schemas/mobile.schema';
import { Problem } from '@/utils/types/DTO/http-errors-interface';

type SendOtpResult = { isSuccess: true } | ({ isSuccess: false } & Problem);

export async function sendOtpAction(dto: Mobile): Promise<SendOtpResult> {
    try {
        await api.auth.sendOtp(dto);
        return { isSuccess: true };
    } catch (err: unknown) {
        const problem = err as Problem;
        return { isSuccess: false, ...problem };
    }
}
