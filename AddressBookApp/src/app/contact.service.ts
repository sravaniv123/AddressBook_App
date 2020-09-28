import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  
  getContacts(){
    return this.httpClient.get(`${this.API_URL}/api/contacts`);
  }  
  updateContact(contact){
    console.log(contact.firstName)
    return this.httpClient.put(`${this.API_URL}/api/contacts/${contact.id}`,contact);
  }
  createContact(contact){
    return this.httpClient.post(`${this.API_URL}/api/contacts/`,contact);
  }
  deleteContact(contact){
    return this.httpClient.delete(`${this.API_URL}/api/contacts/${contact.id}`);
  }


}
