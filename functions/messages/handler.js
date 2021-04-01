import { post as PostController } from './controllers/post'
import { index as IndexController } from './controllers/index'

export const index = async ({ body, httpMethod }) => {
  if (httpMethod === 'POST') {
    return PostController(JSON.parse(body))
  }

  return IndexController()
}
