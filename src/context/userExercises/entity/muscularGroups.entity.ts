import { Entity, PrimaryGeneratedColumn, Column, Table } from "typeorm";

@Entity({
  name: "muscularGroups",
})
export class MuscularGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @isstring
  @Column()
  title!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @Column()
  deletedAt!: Date;
}