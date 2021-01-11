import {
  Table,
  Column,
  Model,
  Unique,
  DataType,
  AutoIncrement,
  PrimaryKey,
  ForeignKey,
} from "sequelize-typescript";
import Projects from "./projects.model";
import User from "./user.model";

@Table
class Organisation extends Model<Organisation> {
  @PrimaryKey
  @AutoIncrement
  @ForeignKey(() => Projects)
  @Column
  organisationId: number;

  @Unique
  @Column
  @ForeignKey(() => User)
  owner: number;

  @Column
  name: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  collaborators: string[];
}

export default Organisation;
