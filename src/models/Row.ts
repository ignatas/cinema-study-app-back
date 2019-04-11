import Sequelize from 'sequelize';

import sequelize from '../config/sequelize';
import RowCategoryModel from './RowCategory';

const Row = sequelize.define(
  'row',
  {
    quantity: {
      type: Sequelize.INTEGER,
      validate: {
        isNumeric: true,
        min: 0
      }
    },
    'row-order': {
      type: Sequelize.INTEGER,
      validate: {
        isNumeric: true,
        min: 1
      }
    },
    lastInSection: Sequelize.BOOLEAN
  },
  {
    schema: 'cinemaapp'
  }
);

Row.belongsTo(RowCategoryModel, {
  foreignKey: 'category-id',
  targetKey: 'id'
});

export default Row;
