import fs from 'fs';
import cassandra from 'cassandra-driver';

const AWS_REGION_NAME = 'ap-southeast-1';

const authProvider = new cassandra.auth.PlainTextAuthProvider(
  process.env.AWS_CASSANDRA_USERNAME,
  process.env.AWS_CASSANDRA_PASSWORD
);
const contactPoints = [`cassandra.${AWS_REGION_NAME}.amazonaws.com:9142`];
const sslOptions = {
  cert: fs.readFileSync('./AmazonRootCA1.pem'),
  host: `cassandra.${AWS_REGION_NAME}.amazonaws.com`,
  rejectUnauthorized: true
};
const client = new cassandra.Client({
  contactPoints,
  authProvider,
  localDataCenter: AWS_REGION_NAME,
  keyspace: 'books_keyspace',
  sslOptions: sslOptions,
});

export {client as default};
