
import sequelize from '../config/sequellize.js';
import Job from '../src/jobs/jobSchema.js'
import Profile from '../src/profiles/profileSchema.js'
import Contract from '../src/contracts/contractSchema.js'


Profile.hasMany(Contract, {as :'Contractor',foreignKey:'contractorId'})
Contract.belongsTo(Profile, {as: 'Contractor'})
Profile.hasMany(Contract, {as : 'Client', foreignKey:'clientId'})
Contract.belongsTo(Profile, {as: 'Client'})
Contract.hasMany(Job)
Job.belongsTo(Contract)


/*
 * ********************* Models synchronization *********************
 */
// sequelize.sync({ alter: { drop: true } });
