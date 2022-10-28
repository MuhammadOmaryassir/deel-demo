const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('../config/sequellize')
import '../utils/associations'

import ContractRouter from './contracts';
import JobRouter from './jobs'
import ProfileRouter from './profiles';

const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use('/', ContractRouter)
app.use('/', JobRouter)
app.use('/', ProfileRouter)



module.exports = app;
