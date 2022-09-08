import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  fetchUsers() {
    return this.userRepository.find();
  }
  storeUser(requestBody: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...requestBody,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }
  async updateUser(id: number, requestBody: UpdateUserDto) {
    await this.userRepository.update(id, { ...requestBody });
    return this.userRepository.findOneBy({ id });
  }

  deleteUser(id: number) {
    this.userRepository.delete(id);
  }
}
