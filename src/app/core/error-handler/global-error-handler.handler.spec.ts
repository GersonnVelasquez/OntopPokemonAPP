import { TestBed } from '@angular/core/testing'
import { HttpErrorResponse } from '@angular/common/http'
import { GlobalErrorHandler } from './global-error-handler.handler'

describe('GlobalErrorHandler', () => {
  let service: GlobalErrorHandler

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorHandler],
    })
    service = TestBed.inject(GlobalErrorHandler)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('handleError', () => {
    it('should console log the error', () => {
      const error = new Error('Test error')
      spyOn(console, 'log')
      service.handleError(error)
      expect(console.log).toHaveBeenCalledWith(error)
    })

    it('should alert a basic error message if error is not HttpErrorResponse', () => {
      const error = new Error('Test error')
      spyOn(service, 'basicErrorMessage')
      service.handleError(error)
      expect(service.basicErrorMessage).toHaveBeenCalled()
    })

    it('should not alert a basic error message if error is HttpErrorResponse', () => {
      const error = new HttpErrorResponse({})
      spyOn(service, 'basicErrorMessage')
      service.handleError(error)
      expect(service.basicErrorMessage).not.toHaveBeenCalled()
    })
  })

  describe('basicErrorMessage', () => {
    it('should alert a basic error message', () => {
      spyOn(window, 'alert')
      service.basicErrorMessage()
      expect(window.alert).toHaveBeenCalledWith(
        'An error occurred. Please try again later or contact support if the problem persists.',
      )
    })
  })
})
