import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable } from '@angular/core'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error) {
    // Really very basic error handling
    this.alertError(error)
    console.log(error)
  }

  // TODO: Create a service for this kind of messages
  basicErrorMessage() {
    alert(
      'An error occurred. Please try again later or contact support if the problem persists.',
    )
  }

  alertError(error: Error) {
    // Handling HttpErrorResponse on the effects
    if (!(error instanceof HttpErrorResponse)) {
      this.basicErrorMessage()
    }
  }
}
