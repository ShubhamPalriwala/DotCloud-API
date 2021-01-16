import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  Scopes,
} from "sequelize-typescript";
import Projects from "./projects.model";
import User from "./user.model";

@Scopes(() => ({
  projectKey(token) {
    return {
      include: [{ model: Projects, where: { token } }],
    };
  },
  userToken(token) {
    return {
      include: [{ model: User, where: { token } }],
    };
  },
}))
@Table
class Keys extends Model<Keys> {
  @PrimaryKey
  @AutoIncrement
  @Column
  keyId: number;

  @Column
  @ForeignKey(() => User)
  creatorId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Projects)
  projectId: Projects;

  @BelongsTo(() => Projects, {
    foreignKey: {
      allowNull: false,
    },
  })
  project: Projects;

  @Column
  keyName: string;

  @Column
  value: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  collaborators: string[];
}
export default Keys;
