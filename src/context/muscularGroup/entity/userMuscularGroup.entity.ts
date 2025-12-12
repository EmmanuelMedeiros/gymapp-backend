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

@Entity({
  name: 'userMuscularGroups',
})
export class MuscularGroup {
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
