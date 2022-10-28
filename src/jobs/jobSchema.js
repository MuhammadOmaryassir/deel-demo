import Sequelize, { Model } from 'sequelize';
import db from '../../config/sequellize'


 /**
   * Initialize a model, representing a table in the DB, with attributes and options.
   * @param  {Sequelize.Sequelize} sequelize
   * @param  {Sequelize} DataTypes
   * @return {Job}
   */

class Job extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        jobId: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        price:{
          type: Sequelize.DECIMAL(12,2),
          allowNull: false
        },
        paid: {
          type: Sequelize.BOOLEAN,
          default:false
        },
        paymentDate:{
          type: Sequelize.DATE
        },
        contractId:{
          type: DataTypes.INTEGER(11).UNSIGNED,
          allowNull: false,
          references: {
            model: 'Contract',
            key: 'coontractId',
          },
        }
      },
      {
        sequelize,
        modelName: 'Job'
      }
    );
    return Contract
  }
}
Job.init(db, Sequelize);
export default Job;



