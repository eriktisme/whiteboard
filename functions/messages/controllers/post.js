const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB({
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
})

export const post = async ({ author, text }) => {
  if (!author || !text) {
    return {
      statusCode: 403,
      body: 'Author and text are required.',
    }
  }

  try {
    await dynamodb
      .putItem({
        TableName: 'board-messages-table',
        Item: {
          partKey: { S: 'board' },
          author: { S: author },
          text: { S: text },
          createdAt: { N: String(Date.now()) },
        },
      })
      .promise()

    return {
      statusCode: 200,
      body: 'Message posted on board.',
    }
  } catch (e) {
    console.error(e)

    return {
      statusCode: 500,
      body: 'Something went wrong!',
    }
  }
}
