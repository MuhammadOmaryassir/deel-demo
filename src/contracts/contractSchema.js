import Sequelize, { Model } from 'sequelize';
import db from '../../config/sequellize'


 /**
   * Initialize a model, representing a table in the DB, with attributes and options.
   * @param  {Sequelize.Sequelize} sequelize
   * @param  {Sequelize} DataTypes
   * @return {Contract}
   */

class Contract extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        coontractId: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        terms: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        status:{
          type: Sequelize.ENUM('new','in_progress','terminated')
        },
        contractorId:{
          type: DataTypes.INTEGER(11).UNSIGNED,
          allowNull: false,
          references: {
            model: 'Profile',
            key: 'profileId',
          },
        },
        clientId:{
          type: DataTypes.INTEGER(11).UNSIGNED,
          allowNull: false,
          references: {
            model: 'Profile',
            key: 'profileId',
          },
        }
      },
      {
        sequelize,
        modelName: 'Contract'
      }
    );
    return Contract
  }
}
Contract.init(db, Sequelize);
export default Contract;



