import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Table,
  OneToMany,
} from "typeorm";
import { UserExercise } from "../../userExercises/entity/userExercises.entity";

@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "string",
    generated: "uuid",
  })
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @Column()
  deletedAt!: Date;

  @OneToMany(() => UserExercise, (exercise) => exercise.user)
  exercises!: UserExercise[];
}
