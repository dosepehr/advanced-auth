'use server';

import api from '@/utils/api';
import { VerifyDTO } from '../_schemas/verify.schema';
import { Problem } from '@/utils/types/DTO/http-errors-interface';

type VerifyMobileResult =
    | { isSuccess: true }
    | ({ isSuccess: false } & Problem);

export async function verifyMobileAction(
    dto: VerifyDTO
): Promise<VerifyMobileResult> {
    try {
        const res = await api.auth.verifyMobile(dto);
        console.log(res);
        return {
            isSuccess: true,
        };
    } catch (err: unknown) {
        const problem = err as Problem;
        return { isSuccess: false, ...problem };
    }
}
