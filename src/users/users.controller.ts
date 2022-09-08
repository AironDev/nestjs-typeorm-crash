import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserParams } from './types/create-user.type';
import { UpdateUserParams } from './types/update-user.type';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }
  @Post()
  createUser(@Body() createUserReq: CreateUserParams) {
    return this.userService.storeUser(createUserReq);
  }

  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserReq: UpdateUserParams,
  ) {
    return this.userService.updateUser(id, updateUserReq);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteUser(id);
  }
}
