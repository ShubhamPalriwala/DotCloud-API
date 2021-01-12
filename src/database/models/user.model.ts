import { Table, Column, Model, Unique, HasMany } from "sequelize-typescript";
import Organisation from "./organisation.model";
import Projects from "./projects.model";

@Table
class User extends Model<User> {
  @Unique
  @Column
  username: string;

  @Column
  password: string;

  @Unique
  @Column
  email: string;

  @HasMany(() => Projects)
  projects: Projects[];

  @HasMany(() => Organisation)
  organisations: Organisation[];
}

export default User;
