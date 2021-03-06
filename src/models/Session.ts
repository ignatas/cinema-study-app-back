import Sequelize from 'sequelize';

import { SeatItem } from '../types/session';
import sequelize from '../config/sequelize';
import Movie from './Movie';
import Hall from './Hall';
import Order from './Order';

const Session = sequelize.define(
  'session',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    prices: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: false
    },
    reserved: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      get() {
        return this.getDataValue('reserved') || [];
      },
      set(value: SeatItem) {
        const prevValue = this.getDataValue('reserved') || [];
        const pickedBefore = prevValue.find(
          (item: { row: number; seat: number; userID: number }) =>
            value.row === item.row &&
            item.seat === value.seat &&
            item.userID === value.userID
        );
        let newValue;
        if (pickedBefore) {
          newValue = prevValue.filter(
            (item: { row: number; seat: number; userID: number }) =>
              item.row !== value.row ||
              item.seat !== value.seat ||
              item.userID !== value.userID
          );
        } else {
          newValue = prevValue.concat(value);
        }
        this.setDataValue('reserved', newValue);
      }
    },
    ordered: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      get() {
        return this.getDataValue('ordered') || [];
      },
      set(value: SeatItem[]) {
        const prevValue = this.getDataValue('ordered') || [];
        const newValue = prevValue.concat(value);
        this.setDataValue('ordered', newValue);
      }
    }
  },
  {
    schema: 'cinemaapp'
  }
);

Session.belongsTo(Movie, {
  foreignKey: 'movie-id',
  targetKey: 'id'
});

Session.belongsTo(Hall, {
  foreignKey: 'hall-id',
  targetKey: 'id'
});

Order.belongsTo(Session, {
  foreignKey: 'session-id',
  targetKey: 'id'
});

export default Session;
