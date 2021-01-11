import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
class Keys extends Model<Keys> {
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
