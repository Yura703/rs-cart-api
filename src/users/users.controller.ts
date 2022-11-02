import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './services/users.service';


@Controller('api/profiles')
export class UserController {
  constructor(
    private readonly userService: UsersService
  ) {}

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ) {    
    return this.userService.findOne(id);
  }
}