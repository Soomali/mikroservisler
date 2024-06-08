
    import { Injectable } from "@nestjs/common";
import { CreateProductsDto } from "./dto/create-products.dto";
import { UpdateProductsDto } from "./dto/update-products.dto";
import { InjectModel } from "@nestjs/mongoose";
import {Products} from "./schema/products.schema";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Products.name) private readonly productsModel: Model<Products>) { }

  create(createProductsDto: CreateProductsDto) {
    return this.productsModel.create(createProductsDto);
  }

  findAll() {
    return this.productsModel.find({});
  }

  findOne(id: string) {
    return this.productsModel.findById(id);
  }

  update(id: string, updateProductsDto: UpdateProductsDto) {
    return this.productsModel.findByIdAndUpdate(id, updateProductsDto);
  }

  remove(id: string) {
    return this.productsModel.findByIdAndDelete(id);
  }
} 
    