import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  DeleteDateColumn,
  Relation
} from "typeorm";
import { UserNotificationFrequency } from "../../userNotificationFrequency/entity/userNotificationFrequency.entity";
import { UserExercise } from "../../userExercise/entity/userExercise.entity";

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

  @DeleteDateColumn()
  deletedAt!: Date;

  @OneToOne(() => UserNotificationFrequency, (notification) => notification.user)
  userNotificationFrequency!: Relation<UserNotificationFrequency>

  @OneToMany(() => UserExercise, (userExercise) => userExercise.user)
  userExercises!: Relation<UserExercise>[]

  @Column()
  deviceToken!: string;
}
