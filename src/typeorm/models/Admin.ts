import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('master_admins')
export class Admin extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  username?: string;
  @Column({ type: 'varchar', length: 255 })
  password?: string;
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
