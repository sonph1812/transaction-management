import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("refresh-token")
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id:number

  @Column({ type: "varchar" })
  refreshToken:string

  @Column({type:"int"})
  userId: number

  @Column({type:"int"})
  expiredTime:number


}
