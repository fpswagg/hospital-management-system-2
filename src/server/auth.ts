import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "./db";

export enum AuthProblem {
    undefined,
    usernameUsed,
    usernameNotUsed,
    wrongPassword,
}

export interface UserData {
    id: string;
    username: string;
    hashed: string;
    createdAt: Date;
}

export class AuthError extends Error {
    public readonly problem: AuthProblem

    constructor(message: string | Error, problem: AuthProblem = AuthProblem.undefined) {
        if (message instanceof Error) {
            super(message.message);
            this.cause = message.cause;
            this.stack = message.stack;
            this.name = message.name;

        } else {
            super(message);
            this.name = "AuthError";
        }
        
        this.problem = problem;
    }

    
}

export async function makeAccount(username: string, password: string) {
    try {
        if (await hasUser(username))
            throw new AuthError("The username is already in used!", AuthProblem.usernameUsed);

        const hashed = await bcrypt.hash(password, 10);

        return await db.user.create({ data: { username, hashed } });
    } catch (error: unknown) {
        if (error instanceof AuthError)
            throw error;
        else   
            throw new AuthError(error as Error | string);
    }
}

export async function getAccount(username: string, password: string) {
    try {
        const user = await db.user.findUnique({ where: { username } });

        if (!user)
            throw new AuthError("The username does not exist!", AuthProblem.usernameNotUsed);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (!(await bcrypt.compare(password, user.hashed)))
            throw new AuthError("The password does not correspond!", AuthProblem.wrongPassword);

        return user;
    } catch (error: unknown) {
        if (error instanceof AuthError)
            throw error;
        else   
            throw new AuthError(error as Error | string);
    }
}

export async function hasUser(username: string) {
    try {
        return !!(await db.user.findUnique({ where: { username } }));
    } catch (error: unknown) {
        throw new AuthError(error as Error | string);
    }
}

export async function connect(user: UserData) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
    });
}