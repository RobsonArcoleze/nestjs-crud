import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'text', type: 'varchar', length: 255 })
  text: string;

  @Column({ name: 'from', type: 'varchar', length: 50 })
  from: string;

  @Column({ name: 'to', type: 'varchar', length: 50 })
  to: string;

  @Column({ name: 'read', default: false })
  read: boolean;

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;
}
