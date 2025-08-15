import { Person } from 'src/person/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'text', type: 'varchar', length: 255 })
  text: string;

  @ManyToOne(() => Person, person => person.messageSend, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'from_id_person' })
  from: Person;

  @ManyToOne(() => Person, person => person.messageReceived, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'to_id_person' })
  to: Person;

  @Column({ name: 'read', default: false })
  read: boolean;

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;
}
