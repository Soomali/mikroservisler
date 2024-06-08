/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { SetOrderStatusDTO } from './dto/set-order-status.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./schema/order.schema").Order, "find", {}>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./schema/order.schema").Order, "findOne", {}>;
    update(id: string, updateOrderDto: UpdateOrderDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./schema/order.schema").Order, "findOneAndUpdate", {}>;
    setDelivered(id: string, body: SetOrderStatusDTO): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./schema/order.schema").Order, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, import("./schema/order.schema").Order> & import("./schema/order.schema").Order & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./schema/order.schema").Order, "findOneAndDelete", {}>;
}
