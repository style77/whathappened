export interface IUser {
    id: string;
    email: string;
    createdAt: Date;
}

export interface IKey {
    key: string;
    createdAt: Date;
    updatedAt: Date;
    user: IUser;
    allowed_domains: string[];
}