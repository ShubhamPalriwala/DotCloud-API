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
import CryptoJS from "crypto-js";
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
  get value(): string {
    const bytes = CryptoJS.AES.decrypt(
      this.getDataValue("value"),
      process.env.ENC_KEY
    );
    const decText = bytes.toString(CryptoJS.enc.Utf8);
    return decText;
  }

  set value(input: string) {
    const encText = CryptoJS.AES.encrypt(input, process.env.ENC_KEY).toString();
    this.setDataValue("value", encText);
  }

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  collaborators: string[];
}
export default Keys;
