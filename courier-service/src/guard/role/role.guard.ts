import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationData } from 'src/common/authorization-data';
import { IS_NO_ROLE } from 'src/decorators/no-role.decorator';
import { AuthorizationLevel, ROLES_KEY } from 'src/decorators/roles.decorator';
import { IS_PUBLIC_KEY } from 'src/reflectors/public.reflector';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isNoRole = this.reflector.getAllAndOverride<boolean>(IS_NO_ROLE, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isNoRole) {
      return true;
    }
    const requiredRoles = this.reflector.getAllAndOverride<
      AuthorizationLevel[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true;
    }
    const  data:AuthorizationData = AuthorizationData.parseFrom(context.switchToHttp().getRequest());

    return data && requiredRoles.some((role) => data.authorization_level == role);
  }
}
