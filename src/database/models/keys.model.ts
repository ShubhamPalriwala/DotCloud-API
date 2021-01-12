import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  NotNull,
  AllowNull,
} from "sequelize-typescript";
import Projects from "./projects.model";
import User from "./user.model";

@Table
class Keys extends Model<Keys> {
  @PrimaryKey
  @AutoIncrement
  @Column
  keyId: number;

  @Column
  @ForeignKey(() => User)
  creatorId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Projects)
  projectId: Projects;

  @BelongsTo(() => Projects)
  project: Projects;

  @Column
  key: string;

  @Column
  value: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  collaborators: string[];
}
export default Keys;
