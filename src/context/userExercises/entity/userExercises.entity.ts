import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Table,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../user/entity/user.entity";

@Entity({
  name: "users",
})
export class UserExercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  muscularGroupId!: string;

  @Column()
  weekDay!: number;

  @ManyToOne(() => User, (user) => user.exercises)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  weight!: number;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @Column()
  deletedAt!: Date;
}
