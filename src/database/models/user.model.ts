import { Table, Column, Model, Unique } from "sequelize-typescript";

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

  @Unique
  @Column
  phone: string;
}

export default User;
