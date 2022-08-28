import { UserEntity } from './entities/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRole, SuccessResponse } from 'src/types';
import { hash, genSalt } from 'bcrypt'

@Injectable()
export class UserService {

  async create(createUserDto: CreateUserDto): Promise<SuccessResponse> {

    const alreadyExists = await UserEntity.findOne({where: {email: createUserDto.email}})

    if(alreadyExists)
      throw new ConflictException("user with this email already exists")

    const user = new UserEntity();

    for( const [key, value] of Object.entries(createUserDto)) {
      if(key === 'password') {
        user.passwordHash = await hash(value, await genSalt(10));
      } else
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
