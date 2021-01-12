import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  HasMany,
  Unique,
} from "sequelize-typescript";
import Projects from "./projects.model";
import User from "./user.model";

@Table
class Organisation extends Model<Organisation> {
  @Unique
  @AutoIncrement
  @Column
  organisationId: number;

  @PrimaryKey
  @Column
  @ForeignKey(() => User)
  ownerId: number;

  @PrimaryKey
  @Column
  name: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  collaborators: string[];

  @BelongsTo(() => User)
  owner: User;

  @ForeignKey(() => Projects)
  @HasMany(() => Projects)
  projectId: number;
}

export default Organisation;
