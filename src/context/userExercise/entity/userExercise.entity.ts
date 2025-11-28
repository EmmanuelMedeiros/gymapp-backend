import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { User } from "../../user/entity/user.entity";
import { MuscularGroup } from "../../muscularGroup/entity/muscularGroup.entity";
import { UserExerciseDetail } from "./userExerciseDetail.entity";

@Entity({
  name: "userExercises",
})
export class UserExercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.userExercises)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  title!: string;

  @OneToOne(() => MuscularGroup, (muscularGroup) => muscularGroup.id)
  @JoinColumn({ name: 'muscularGroupId' })
  muscularGroup!: Relation<MuscularGroup>;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => UserExerciseDetail, (userExerciseDetail) => userExerciseDetail.userExercise)
  userExerciseDetails!: Relation<UserExerciseDetail>[];
}
