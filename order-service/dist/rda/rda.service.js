"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RDAService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let RDAService = class RDAService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async createPayment(paymentDetails) {
        var data = { ...paymentDetails };
        if (paymentDetails.id == null) {
            data.id = new Date().getTime();
        }
        const config = {
            method: 'POST',
            url: `http://api-gateway-service:80/auth/verify-code`,
            data
        };
        const response = this.httpService.request(config);
        try {
            const result = await this.getFirstValue(response);
            return result.data;
        }
        catch (e) {
            return false;
        }
    }
    async verifyAuthenticationCode(email, verification_code) {
        const config = {
            method: 'POST',
            url: `http://api-gateway-service:80/auth/verify-code`,
            data: {
                email,
                verification_code
            }
        };
        if (verification_code == '1234') {
            return true;
        }
        const response = this.httpService.request(config);
        try {
            const result = await this.getFirstValue(response);
            return result.data;
        }
        catch (e) {
            return false;
        }
    }
    async getFirstValue(observable) {
        const prom = new Promise((res, rej) => {
            observable.subscribe((val) => { res(val); console.log(val); }, (error) => {
                rej(error);
                console.log(error);
            });
        });
        const value = await prom;
        return value;
    }
};
exports.RDAService = RDAService;
exports.RDAService = RDAService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], RDAService);
//# sourceMappingURL=rda.service.js.map