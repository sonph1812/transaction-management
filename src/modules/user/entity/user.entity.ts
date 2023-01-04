import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "varchar", length: 25 })
  firstname: string;

  @Column({ type: "varchar", length: 25 })
  lastname: string;

  @Column({ type: "varchar", length: 50 ,unique:true})
  email: string;

  @Exclude()
  @Column({ type: "varchar" })
  password: string;

  @UpdateDateColumn()
  updateAt: Date;

  @CreateDateColumn()
  created: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

}
