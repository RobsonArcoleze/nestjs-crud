import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/person/entities/person.entity';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const person = await this.personRepository.findOneByOrFail({
        email: loginDto.email,
      });

      const validation = await this.hashingService.compare(
        loginDto.password,
        person.password,
      );

      if (!validation) throw new UnauthorizedException();

      const acessToken = await this.jwtService.signAsync({
        sub: person.id,
        email: person.email,
      });
      return {
        acessToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Usuário ou senha inválido!');
      }
      throw error;
    }
  }
}
