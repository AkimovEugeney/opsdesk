import * as cookieParser from 'cookie-parser'
import { Request } from 'express'

export const probe = cookieParser

export function readSessionCookie(req: Request): string | undefined {
  return req.cookies?.sid
}
