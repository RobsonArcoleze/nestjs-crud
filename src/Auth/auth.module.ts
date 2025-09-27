import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/person/entities/person.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthService,
  ],
  exports: [HashingService],
})
export class AuthModule {}
