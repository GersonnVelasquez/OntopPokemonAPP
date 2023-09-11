/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing'
import { HttpClient, HttpParams } from '@angular/common/http'

import { of } from 'rxjs'
import { MyHttpService } from './my-http.service'
import { SVR_BACKEND_URL } from '../injection-tokens/backend-url.token'

describe('MyHttpService', () => {
  let service: MyHttpService
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])

    TestBed.configureTestingModule({
      providers: [
        MyHttpService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: SVR_BACKEND_URL, useValue: 'http://test-backend.com' },
      ],
    })

    service = TestBed.inject(MyHttpService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('doGet', () => {
    it('should call HttpClient.get with correct parameters', () => {
      const testUrl = '/test'
      const testParams = { key1: 'value1', key2: 'value2' }
      const expectedParams = new HttpParams()
        .set('key1', 'value1')
        .set('key2', 'value2')

      httpClientSpy.get.and.returnValue(of({}))

      service.doGet(testUrl, testParams).subscribe()

      expect(httpClientSpy.get).toHaveBeenCalledWith(
        'http://test-backend.com/test',
        { params: expectedParams },
      )
    })
  })

  describe('getParams', () => {
    it('should correctly transform a key-value pair object into HttpParams', () => {
      const testParams = { key1: 'value1', key2: 'value2' }
      const expectedParams = new HttpParams()
        .set('key1', 'value1')
        .set('key2', 'value2')

      const result = (service as any).getParams(testParams)
      expect(result).toEqual(expectedParams)
    })
  })
})
