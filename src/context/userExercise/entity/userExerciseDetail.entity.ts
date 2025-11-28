import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { UserExercise } from "./userExercise.entity";

@Entity({
  name: "userExercisesDetails",
})
export class UserExerciseDetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserExercise, (userExercise) => userExercise.userExerciseDetails)
  @JoinColumn({ name: 'userExercisesId' })
  userExercise!: Relation<UserExercise>;

  @Column()
  weight!: number;

  @Column()
  didWeightChange?: boolean;

  @Column()
  createdAt!: Date;
}