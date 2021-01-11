import { Table, Column, Model } from "sequelize-typescript";

@Table
class User extends Model<User> {
  @Column
  username: string;

  @Column
  password: string;
}

export default User;
