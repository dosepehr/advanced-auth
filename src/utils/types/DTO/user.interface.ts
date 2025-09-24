export interface UserRes {
    status: boolean;
    data: {
        user: Data;
    };
}

export interface Data {
    id: number;
    first_name: string;
    last_name: string;
    en_first_name: string;
    en_last_name: null;
    email: string;
    email_verified_at: null;
    mobile_number: string;
    ability: string;
    image: string;
    birth_date: string;
    national_code: string;
    father_name: string;
    address: string;
    city: string;
    bio: string;
    score: number;
    is_admin: boolean;
    is_supporter: boolean;
    active: boolean;
    wallet: string;
    created_at: Date;
    updated_at: Date;
    invitation_code: InvitationCode;
    application_admission: ApplicationAdmission;
}

export interface ApplicationAdmission {
    id: number;
    user_id: number;
    form_step: number;
    user_status: string;
    is_completed: number;
    phase_one: number;
    phase_two: number;
    phase_three: number;
    phase_four: number;
    phase_five: number;
    total_percent: number;
    created_at: Date;
    updated_at: Date;
}

export interface InvitationCode {
    id: number;
    user_id: number;
    invitation_code: number;
    count_used: number;
}
