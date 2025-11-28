import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "../../user/entity/user.entity";

@Entity({
  name: "userNotificationFrequency"
})
export class UserNotificationFrequency {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.userNotificationFrequency)
  @JoinColumn({ name: 'userId' })
  user!: Relation<User>;

  @Column()
  weekDays!: string;

  @Column()
  hour!: string;
}