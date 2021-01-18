import {
  Table,
  Column,
  Model,
  Unique,
  HasMany,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import * as bcrypt from "bcrypt";
import Organisation from "./organisation.model";
import Projects from "./projects.model";
import Deadline from "./deadline.model";

@Table
class User extends Model<User> {
  @Unique
  @Column
  username: string;

  @Column({ type: DataType.UUID })
  token: string;

  @Column
  set password(value: string) {
    const hash = bcrypt.hashSync(value, 10);
    this.setDataValue("password", hash);
  }

  CheckPassword: (password: string) => Promise<boolean>;

  @Unique
  @Column
  email: string;

  @HasMany(() => Projects)
  projects: Projects[];

  @HasMany(() => Deadline)
  deadline: Deadline[];

  @HasMany(() => Organisation)
  organisations: Organisation[];
}

User.prototype.CheckPassword = async function (password: string) {
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (e) {
    return false;
  }
};

export default User;
