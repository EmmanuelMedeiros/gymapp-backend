import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { MuscularGroup } from './muscularGroup.entity';

@Entity({
  name: 'userMuscularGroups',
})
export class UserMuscularGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.userExercises)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @OneToOne(() => MuscularGroup, (muscularGroup) => muscularGroup.id)
  @JoinColumn({ name: 'muscularGroupId' })
  muscularGroup!: Relation<MuscularGroup>;

  @Column()
  weekDays!: string;
}
