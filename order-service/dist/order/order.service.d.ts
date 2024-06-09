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
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order, OrderStatus } from "./schema/order.schema";
import { Model } from "mongoose";
import { RDAService } from "src/rda/rda.service";
export declare class OrderService {
    private readonly orderModel;
    private readonly rdaService;
    constructor(orderModel: Model<Order>, rdaService: RDAService);
    create(createOrderDto: CreateOrderDto): Promise<import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Order, "find", {}>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Order, "findOne", {}>;
    update(id: string, updateOrderDto: UpdateOrderDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Order, "findOneAndUpdate", {}>;
    updateOrderStatus(id: string, order_status: OrderStatus): import("mongoose").Query<import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Order, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Order, "findOneAndDelete", {}>;
}
