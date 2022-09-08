import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderReq, UpdateOrderReq } from './types/orders.types';
import { User } from '..//users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createOrderReq: CreateOrderReq) {
    const productAmount = await this.productRepository
      .createQueryBuilder('product')
      .whereInIds([...createOrderReq.products])
      .select('SUM(product.price)', 'amount')
      .getRawOne();

    const products = await this.productRepository.find({
      where: { id: In([...createOrderReq.products]) },
    });

    // const products = await this.productRepository
    //   .createQueryBuilder('product')
    //   .whereInIds([...createOrderReq.products])
    //   .getMany();

    const user = await this.userRepository.findOneBy({
      id: createOrderReq.userId,
    });

    const order = await this.orderRepository.create({
      amount: productAmount.amount,
      isPaid: false,
      products: products,
      user: user,
      createdAt: new Date(),
    });
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findBy({ id });
  }

  update(id: number, updateOrderReq: UpdateOrderReq) {
    let paidAt = null;
    if (updateOrderReq.isPaid) {
      paidAt = new Date();
    }
    return this.orderRepository.update(id, {
      isPaid: updateOrderReq.isPaid,
      paidAt: paidAt,
    });
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
