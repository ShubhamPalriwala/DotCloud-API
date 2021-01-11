import { Table, Column, Model, Unique, DataType } from "sequelize-typescript";

@Table
class Projects extends Model<Projects> {
  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  collaborators: string[];

  @Unique
  @Column
  token: string;

  @Unique
  @Column
  phone: string;
}

export default Projects;
