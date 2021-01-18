/* eslint-disable import/no-unresolved */
import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import Projects from "./projects.model";
import User from "./user.model";

@Table
class Deadline extends Model<Deadline> {
  @Column
  deadline: Date;

  @ForeignKey(() => User)
  user: number;

  @ForeignKey(() => Projects)
  projectId: number;

  @BelongsTo(() => User)
  users: User[];

  @BelongsTo(() => Projects)
  projects: Projects[];
}

export default Deadline;
