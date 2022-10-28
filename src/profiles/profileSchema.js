import Sequelize, { Model } from 'sequelize';
import db from '../../config/sequellize.js'


 /**
   * Initialize a model, representing a table in the DB, with attributes and options.
   * @param  {Sequelize.Sequelize} sequelize
   * @param  {Sequelize} DataTypes
   * @return {Profile}
   */

class Profile extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        profession: {
          type: Sequelize.STRING,
          allowNull: false
        },
        balance:{
          type:Sequelize.DECIMAL(12,2)
        },
        type: {
          type: Sequelize.ENUM('client', 'contractor')
        }
      },
      {
        sequelize,
        modelName: 'Profile'
      }
    );
    return Profile
  }
}
Profile.init(db, Sequelize);
export default Profile;



