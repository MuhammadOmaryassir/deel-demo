import Sequelize, { Model } from 'sequelize';
import db from '../../config/sequellize.js'


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
      },
      {
        sequelize,
        modelName: 'Job'
      }
    );
    return Job
  }
}
Job.init(db, Sequelize);
export default Job;



