/* eslint-disable import/no-unresolved */
import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  Scopes,
} from "sequelize-typescript";
import { DataTypes, Op } from "sequelize";
import moment from "moment-timezone";
import Projects from "./projects.model";
import User from "./user.model";

moment.tz.setDefault("Asia/Calcutta");

@Scopes(() => ({
  isValidDeadline(projectId, user) {
    const date = moment().toDate();
    return {
      where: {
        user,
        deadline: { [Op.gte]: date },
        projectId,
      },
    };
  },
}))
@Table
class Deadline extends Model<Deadline> {
  @Column({ type: DataTypes.DATE })
  deadline: Date;

  @ForeignKey(() => User)
  user: number;

  @ForeignKey(() => Projects)
  projectId: number;

  @BelongsTo(() => User)
  users: User[];

  @BelongsTo(() => Projects)
  projects: Projects[];
}

export default Deadline;
