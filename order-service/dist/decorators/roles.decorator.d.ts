export declare enum AuthorizationLevel {
    admin = "admin",
    customer = "customer",
    courier = "courier",
    restaurant = "restaurant"
}
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: AuthorizationLevel[]) => import("@nestjs/common").CustomDecorator<string>;
