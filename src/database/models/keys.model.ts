import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from "sequelize-typescript";
import Projects from "./projects.model";

@Table
class Keys extends Model<Keys> {
  @PrimaryKey
  @AutoIncrement
  @Column
  keyId: number;

  @ForeignKey(() => Projects)
  projectId: number;

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
