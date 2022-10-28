
import database from '../config/sequellize';


Profile.hasMany(Contract, {as :'Contractor',foreignKey:'contractorId'})
Contract.belongsTo(Profile, {as: 'Contractor'})
Profile.hasMany(Contract, {as : 'Client', foreignKey:'clientId'})
Contract.belongsTo(Profile, {as: 'Client'})
Contract.hasMany(Job)
Job.belongsTo(Contract)


/*
 * ********************* Models synchronization *********************
 */
database.sync({ alter: { drop: false } });
