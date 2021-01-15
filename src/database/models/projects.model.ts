/* eslint-disable import/no-unresolved */
import {
  Table,
  Column,
  Model,
  Unique,
  DataType,
  HasMany,
  BelongsToMany,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
} from "sequelize-typescript";
import Keys from "./keys.model";
import Organisation from "./organisation.model";
import User from "./user.model";

@Table
class Projects extends Model<Projects> {
  @PrimaryKey
  @AutoIncrement
  @ForeignKey(() => Keys)
  @Column
  projectId: number;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  collaborators: string[];

  @Column
  name: string;

  @Unique
  @Column({ type: DataType.UUID })
  token: string;

  @ForeignKey(() => User)
  owner: number;

  @ForeignKey(() => Organisation)
  organisation: number;

  @HasMany(() => Keys)
  keys: Keys[];

  @BelongsTo(() => User)
  owners: User[];
}

export default Projects;
