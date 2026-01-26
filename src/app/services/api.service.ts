import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private server = environment.serverUrl;


  constructor(private http: HttpClient) { }

  //public endpoints

  registration(){}

  login(){}

  lostpass(){}

  restorepass(){}

  readById(table: string, id: number){
    return this.http.get(`${this.server}/public/${table}/${id}`);
  }

  readByField(table: string, field: string, op: string, value: string){
    return this.http.get(`${this.server}/public/${table}/${field}/${op}/${value}`);
  }

  readAll(table : string){
    return this.http.get(`${this.server}/public/${table}`);
  }
  
  sendMail(){}

  //private endpoints

  selectById(table: string, id: number){
    return this.http.get(`${this.server}/${table}/${id}`);
  }

  selectByField(table: string, field: string, op: string, value: string){
    return this.http.get(`${this.server}/${table}/${field}/${op}/${value}`);
  }

  selectAll(table: string){
    return this.http.get(`${this.server}/${table}`);
  }

  insert(){}

  update(){}

  delete(){}

  deleteAll(){}

  uploadFile(){}

  downloadFile(){}

  deleteFile(){}



}
