import { SetMetadata } from '@nestjs/common';
export enum AuthorizationLevel {

  admin = 'admin',
  customer = 'customer',
  courier = "courier",
  restaurant = "restaurant"
}
export const ROLES_KEY = 'roles';
export const Roles = (...roles: AuthorizationLevel[]) =>
  SetMetadata(ROLES_KEY, roles);
