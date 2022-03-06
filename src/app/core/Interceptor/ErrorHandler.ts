import { ErrorHandler, Injectable } from '@angular/core'
import { AlertService } from 'src/app/shared/components/alert/alert.service'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private alert: AlertService) { }
  handleError(error) {
    if (error && error?.status === 404)
      this.alert.set("Serviço não encontrado")
    else if (error && !error?.status && typeof (error) == 'string')
      this.alert.set(error)
    else
      console.error(error)
  }
}