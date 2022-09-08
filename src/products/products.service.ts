import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  // inject product repository in the constructor
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  store(createProductDto: CreateProductDto) {
    return this.productRepository.save({ ...createProductDto });
  }

  index() {
    return this.productRepository.find();
  }

  show(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({ id }, { ...updateProductDto });
  }

  delete(id: number) {
    this.productRepository.delete(id);
  }
}
