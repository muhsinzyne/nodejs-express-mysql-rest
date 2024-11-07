import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class QueueAdmin extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  username!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;
}
