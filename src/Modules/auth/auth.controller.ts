import { Controller, Post, Body, UseFilters, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/Modules/Common/http-excepcion.filter';
import { LoginUserDto } from './dto/login-user.dto';
import { ActionResponse, DataResponse } from 'src/Model/responses';
import { User } from './entities/user.entity';

@ApiTags('Auth')
@UseFilters(HttpExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Register a new User' })
  @ApiOkResponse({ type: ActionResponse })
  @Post('/register')
  createUser(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @ApiOperation({ summary: 'User Login' })
  @ApiOkResponse({ type: ActionResponse })
  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
  
  @ApiOperation({ summary: 'Get all Users' })
  @ApiOkResponse({ type: DataResponse })
  @Get('/allUsers')
  findAll() : Promise<DataResponse<User[]>> {
    return this.authService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
