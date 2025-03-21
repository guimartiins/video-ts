import { NotFoundError } from '@core/shared/domain/errors/not-found.error'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

@Catch(NotFoundError)
export class NotFoundErrorFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = 404

    response.status(status).json({
      statusCode: status,
      error: 'Not Found',
      message: exception.message
    })
  }
}
