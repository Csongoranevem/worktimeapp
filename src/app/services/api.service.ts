import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Header } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private server = environment.serverUrl;


  constructor(private http: HttpClient) { }

  //public endpoints

  registration(table: string, data: object){
    return this.http.post(`${this.server}/public/${table}`, data);
  }

  login(data: object){
    return this.http.post(`${this.server}/public/login`, data);
  }

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
    return this.http.get(`${this.server}/${table}/${id}`, this.tokenHeader());
  }

  selectByField(table: string, field: string, op: string, value: string){
    return this.http.get(`${this.server}/${table}/${field}/${op}/${value}`);
  }

  selectAll(table: string){
    const token = sessionStorage.getItem('token') || '';
    return this.http.get(`${this.server}/${table}`, {headers: {'Authorization': `Bearer ${token}`}});
  }

  insert(){}

  update(){}

  delete(){}

  deleteAll(){}

  uploadFile(){}

  downloadFile(){}

  deleteFile(){}


  getToken(){
    return sessionStorage.getItem('token') || '';
  }

  tokenHeader(){
    let token = this.getToken();
    return {headers: {'Authorization': `Bearer ${token}`}};
  }

}
