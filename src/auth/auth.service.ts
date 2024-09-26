import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-auth.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { phrase, ...userData } = createUserDto;
    const user = await this.userModel.create({
      ...userData,
      phrase: bcrypt.hashSync(phrase, 15),
    });
    return user;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    const { email, phrase } = loginUserDto;
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new Error(
        '¡Ups! No pudimos encontrarte con esas credenciales. ¿Te equivocaste al escribirlas?',
      );
    }

    if (!bcrypt.compareSync(phrase, user?.phrase || '')) {
      throw new Error(
        '¡Ups! No pudimos encontrarte con esas credenciales. ¿Te equivocaste al escribirlas?',
      );
    }
    return user;
  }
  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   console.log(updateAuthDto);
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
