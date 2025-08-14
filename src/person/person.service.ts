import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personReposistory: Repository<Person>,
  ) {}
  async create(createPersonDto: CreatePersonDto) {
    try {
      const person = this.personReposistory.create(createPersonDto);
      return await this.personReposistory.save(person);
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === '23505')
        throw new ConflictException('Email already registered');
      throw error;
    }
  }

  findAll() {
    return this.personReposistory.find();
  }

  async findOne(id: number) {
    const person = await this.personReposistory.findOneBy({ id });
    if (!person) throw new NotFoundException(`Person with id ${id} not found`);
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.personReposistory.preload({
      id,
      ...updatePersonDto,
    });

    if (!person) throw new NotFoundException(`Person with id ${id} not found`);
    return this.personReposistory.save(person);
  }

  async remove(id: number) {
    try {
      const person = await this.personReposistory.findOneByOrFail({ id });
      return this.personReposistory.remove(person);
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Person with id ${id} not found`);
    }
  }
}
