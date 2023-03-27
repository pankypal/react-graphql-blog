import { Request, Response } from "express"

import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    userId: string;
  }
}

export type BlogContext = {
    req: Request,
    res: Response
}
