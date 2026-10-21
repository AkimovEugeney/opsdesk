import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const PUBLIC_ROUTE = 'auth:public'

export const Public = ():CustomDecorator<string> =>
  SetMetadata(PUBLIC_ROUTE, true)