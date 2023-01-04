import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TransactionCategoryEnum, TransactionTypeEnum } from "../enum/transaction.enum";
import { Exclude } from "class-transformer";
import { User } from "../../user/model/user.model";


export class Transaction{
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: "enum", enum: TransactionTypeEnum, default: TransactionTypeEnum.credit })
  type: TransactionTypeEnum;

  @Column({ type: "enum", enum: TransactionCategoryEnum, default: TransactionCategoryEnum.revenue })
  category: TransactionCategoryEnum;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column()
  date: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  userId: number;

  // -- Relations

  @Exclude() // Excluding the relation object from appearing in the results because the user Id above is enough
  @ManyToOne(() => User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  // --

  constructor(partial: Partial<Transaction>) {
    Object.assign(this, partial);
  }
}
