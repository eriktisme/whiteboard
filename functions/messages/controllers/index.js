const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB({
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
})

export const index = async () => {
  try {
    const result = await dynamodb
      .query({
        TableName: 'board-messages-table',
        KeyConditionExpression: 'partKey = :partKey',
        ScanIndexForward: false,
        Limit: 5,
        ExpressionAttributeValues: { ':partKey': { S: 'board' } },
      })
      .promise()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.Items),
    }
  } catch (e) {
    console.error(e)
    return {
      statusCode: 500,
      body: 'Something went wrong!',
    }
  }
}
