import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const candidate = await this.getUserByEmail(registerDto.email);
    if (candidate) {
      throw new HttpException(
        'User with such email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(registerDto.password, 7);
    const user = await this.createUser({
      ...registerDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    return this.generateToken(user);
  }

  async profile(currentUserId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: currentUserId },
      include: { orders: true },
    });
    if (!user) {
      throw new HttpException(
        'User with such id doesnt exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  private async generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async createUser(registerDto: RegisterDto) {
    const candidate = await this.getUserByEmail(registerDto.email);
    if (candidate) {
      throw new HttpException(
        'User with such email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.prisma.user.create({ data: registerDto });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.getUserByEmail(loginDto.email);
    if (!user) {
      throw new HttpException(
        'User with such email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const compare = await bcrypt.compare(loginDto.password, user.password);
    if (!compare) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
