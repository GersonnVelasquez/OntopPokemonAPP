import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { SVR_BACKEND_URL } from '../injection-tokens/backend-url.token'
import { Observable } from 'rxjs'
import { KeyValuePair } from 'src/app/core/models/key-value-pair.interface'

@Injectable()
export class MyHttpService {
  private svrBackendUrl = inject(SVR_BACKEND_URL)
  private httpClient = inject(HttpClient)

  doGet<T>(url: string, params: KeyValuePair = {}): Observable<T> {
    return this.httpClient.get<T>(`${this.svrBackendUrl}${url}`, {
      params: this.getParams(params),
    })
  }

  private getParams(params: KeyValuePair): HttpParams {
    let httpParams = new HttpParams()
    Object.keys(params).forEach((key) => {
      httpParams = httpParams.set(key, `${params[key]}`)
    })
    return httpParams
  }
}
