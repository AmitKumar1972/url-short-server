// user.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  async signUp(
    @Body() body: { name: string; userName: string; password: string },
  ) {
    const { name, userName, password } = body;

    // Validate name, username, and password
    if (!name || !userName || !password) {
      throw new BadRequestException(
        'Name, username, and password are required',
      );
    }

    if (!(await this.userService.validateUsername(userName))) {
      throw new BadRequestException(
        'Username should be at least 8 characters with only alphabet and number',
      );
    }

    if (!(await this.userService.validatePassword(password))) {
      throw new BadRequestException(
        'Password should be at least 8 characters with alphabet, number, and special character',
      );
    }

    const existingUser = await this.userService.findByUsername(userName);

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = await this.userService.createUser({
      name,
      userName,
      password: hashedPassword,
    });

    // Generate and return a token
    const token = await this.authService.generateToken(
      newUser.id,
      newUser.userName,
    );

    return { token };
  }

  @Post('/login')
  async login(@Body() body: { userName: string; password: string }) {
    const { userName, password } = body;

    // Validate username and password
    if (!userName || !password) {
      throw new BadRequestException('Username and password are required');
    }

    const user = await this.userService.findByUsername(userName);

    if (!(user && (await bcrypt.compare(password, user.password)))) {
      throw new BadRequestException('Invalid credentials');
    }

    // Generate and return a token
    const token = await this.authService.generateToken(user.id, user.userName);
    return { token };
  }
}
