import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObjToText } from '../obj-to-text';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) { }

  upload(file: File, address: string, layer: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    let queryParams = new HttpParams();
    queryParams = queryParams.append("address",address).append("layer",layer);


    const req = new HttpRequest('POST', 'http://localhost:8080/upload', formData, {
      params: queryParams,
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req); 
  }

  delete(address: string, layer: string): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("address",address).append("layer",layer);
    return this.http.delete('http://localhost:8080/deleteDir', {params:queryParams})

  }
  
  getFiles(): Observable<any> {
    return this.http.get('http://localhost:8080/files');
  }

  generateNFTs(address: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("address",address);
    return this.http.get('http://localhost:8080/generate', {params:queryParams});
  }

  configure(objToText: ObjToText): Observable<any> {
    
    const req = new HttpRequest<ObjToText>('POST', 'http://localhost:8080/upload', objToText);
    return this.http.request(req); 
  }
}