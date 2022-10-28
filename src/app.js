import express from 'express';
import bodyParser from 'body-parser'
import sequelize from '../config/sequellize.js'

import ContractRouter from './contracts/index.js';
import JobRouter from './jobs/index.js'
import ProfileRouter from './profiles/index.js';
import '../utils/associations.js'

const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use('/', ContractRouter)
app.use('/', JobRouter)
app.use('/', ProfileRouter)

try {
    app.listen(3001, () => {
      console.log('Express App Listening on Port 3001');
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }


// module.exports = app;
