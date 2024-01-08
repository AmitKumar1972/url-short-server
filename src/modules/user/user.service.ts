import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { userName: username },
    });
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async validateUsername(username: string): Promise<boolean> {
    // Validate username format (at least 8 characters, only alphabet and number)
    const regex = /^[a-zA-Z0-9]{8,}$/;
    return regex.test(username);
  }

  async validatePassword(password: string): Promise<boolean> {
    // Validate password format (at least 8 characters with alphabet, number, and special character)
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  }
}
