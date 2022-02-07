// import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

// import env from '@module/env';
// import log from '@module/log';

// const logger = log.getLogger('AWS::DynamoDB');

// const client = new DynamoDBClient({
//   region: env.AWS_REGION,
// });

// export async function insert(data) {
//   const command = new PutItemCommand({
//     TableName: env.AUDIT_TABLE,
//     Item: {
//       ...data,
//     },
//   });

//   try {
//     await client.send(command);

//     logger.debug('Inserted record');
//   } catch (err) {
//     if (err instanceof Error) {
//       logger.error(err.message);
//     }
//   }
// }
