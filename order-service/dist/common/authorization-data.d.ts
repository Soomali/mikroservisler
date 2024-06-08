export declare class AuthorizationData {
    email: string;
    authorization_level: string;
    is_verified: boolean;
    _id: string;
    constructor(email: string, authorization_level: string, is_verified: boolean, _id: string);
    static parseFrom(req: Request): AuthorizationData | null;
    toHeaders(): {
        'user-email': string;
        'authorization-level': string;
        verified: boolean;
        'user-id': string;
    };
}
