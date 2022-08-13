import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRole, SuccessResponse } from 'src/types';

@Injectable()
export class UserService {

  async create(createUserDto: CreateUserDto): Promise<SuccessResponse> {
    const user = new UserEntity();

    for( const [key, value] of Object.entries(createUserDto)) {
      user[key] = value
    }

    user.role = UserRole.User;

    await user.save()

    return {isSuccess: true};
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const userToBeUpdated = await UserEntity.findOne({where: {id}})

    for( const [key, value] of Object.entries(userToBeUpdated)) {
      userToBeUpdated[key] = value
    }

    await userToBeUpdated.save()
    return userToBeUpdated
  }

  async remove(id: string): Promise<SuccessResponse> {
    const userToBeDeleted = await UserEntity.findOne({where: {id}})
    userToBeDeleted.remove()

    return {isSuccess: true};
  }
}
