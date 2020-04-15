import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import cassandra from 'cassandra-driver';
import {dirname} from 'path';

import {AWS_REGION_NAME, AWS_KEYSPACE, AWS_CONTACT_POINTS} from "../constants/index.mjs";

// https://nodejs.org/api/esm.html#esm_import_meta
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sslOptions = {
  cert: fs.readFileSync(path.resolve(__dirname, '../AmazonRootCA1.pem')),
  host: `cassandra.${AWS_REGION_NAME}.amazonaws.com`,
  rejectUnauthorized: true,
};
const authProvider = new cassandra.auth.PlainTextAuthProvider(
  process.env.AWS_CASSANDRA_USERNAME,
  process.env.AWS_CASSANDRA_PASSWORD
);
// https://docs.datastax.com/en/developer/nodejs-driver/4.5/features/mapper/getting-started/
const client = new cassandra.Client({
  contactPoints: AWS_CONTACT_POINTS,
  localDataCenter: AWS_REGION_NAME,
  keyspace: AWS_KEYSPACE,
  sslOptions,
  authProvider,
});
const mapper = new cassandra.mapping.Mapper(client, {
  models: {
    Book: {
      tables: ['books'],
    },
  },
});
const bookMapper = mapper.forModel('Book');

export {bookMapper as default};
