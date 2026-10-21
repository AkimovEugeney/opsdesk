import type { Request } from 'express'
import { Permissions, UserRole } from '../../generated/prisma/enums'

export type AuthenticatedUser = {
  id: number
  name: string
  role: UserRole
  permissions: Permissions[]
}

export type SessionRequest = Request & {
  user?: AuthenticatedUser
}
