import { Table, Column, Model, Unique, DataType } from "sequelize-typescript";

@Table
class Organisation extends Model<Organisation> {
  @Unique
  @Column
  owner: string;

  @Column
  name: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  collaborators: string[];
}

export default Organisation;
