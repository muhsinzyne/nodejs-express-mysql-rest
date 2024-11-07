import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  test12!: string;

  @Column()
  test334!: string;

  @Column()
  is_active!: boolean;

  @Column()
  kunna!: string;

  @Column()
  as53434!: string;
}
