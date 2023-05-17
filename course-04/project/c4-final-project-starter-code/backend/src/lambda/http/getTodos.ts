import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { getAllTodos } from '../../handlers/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const userId = getUserId(event);
      const items = await getAllTodos(userId)
      return {
        statusCode: 200,
        body: JSON.stringify({
          items
        })
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'server error' })
      }
    }
  }
)
handler.use(
  cors({
    credentials: true
  })
)
