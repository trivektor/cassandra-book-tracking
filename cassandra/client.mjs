import fs from 'fs';
import cassandra from 'cassandra-driver';

import {AWS_REGION_NAME, AWS_CONTACT_POINTS, AWS_KEYSPACE} from "../constants/index.mjs";

const authProvider = new cassandra.auth.PlainTextAuthProvider(
  process.env.AWS_CASSANDRA_USERNAME,
  process.env.AWS_CASSANDRA_PASSWORD
);
const sslOptions = {
  cert: fs.readFileSync('./AmazonRootCA1.pem'),
  host: `cassandra.${AWS_REGION_NAME}.amazonaws.com`,
  rejectUnauthorized: true
};
const client = new cassandra.Client({
  contactPoints: AWS_CONTACT_POINTS,
  authProvider,
  localDataCenter: AWS_REGION_NAME,
  keyspace: AWS_KEYSPACE,
  sslOptions: sslOptions,
});

export {client as default};
