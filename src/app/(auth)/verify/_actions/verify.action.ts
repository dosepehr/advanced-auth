'use server';

import api from '@/utils/api';
import { VerifyDTO } from '../_schemas/verify.schema';
import { Problem } from '@/utils/types/DTO/http-errors-interface';
import { cookies } from 'next/headers';
import { encryptSession } from '@/utils/types/funcs/session';

type VerifyMobileResult =
    | { isSuccess: true }
    | ({ isSuccess: false } & Problem);

export async function verifyMobileAction(
    dto: VerifyDTO
): Promise<VerifyMobileResult> {
    try {
        const res = await api.auth.verifyMobile(dto);
        const cookiesStore = await cookies();
        const encryptedSession = await encryptSession(res);

        cookiesStore.set('session-cookie', encryptedSession);
        return {
            isSuccess: true,
        };
    } catch (err: unknown) {
        const problem = err as Problem;
        return { isSuccess: false, ...problem };
    }
}
