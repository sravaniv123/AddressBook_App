import { Component,OnInit  } from '@angular/core';
import { ContactService } from './contact.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AddressBookApp';
  
  id:any;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  emailAddress: string;
  showForm = false;
  isUpdateContact = false;
  contacts: any = [];
 
 

 
  constructor(private contactService: ContactService) { }
  ngOnInit() {
    this.getContactsFromAPI();
  }

 

  getContactsFromAPI() {
    this.contactService.getContacts().subscribe((data: Array<object>) => {
     this.contacts = data;
     console.log(data);
    });
  }
  // this is called when we create and save contact
  saveContact() { 
    this.showForm = false;
    this.isUpdateContact = false;
    let contactObject = { firstName: this.firstName, lastName: this.lastName, phone:this.phone, emailAddress:this.emailAddress, address:this.address};
   // console.log(JSON.stringify(contactObject, null, 2));
    // this.contactService.createContact(contactObject);

    this.contactService.createContact(contactObject).subscribe((data: any) => {
      console.log("Response " +JSON.stringify(data, null, 2));
      // this.contacts = data;
      this.getContactsFromAPI();
      console.log(data);
    });
    
    
  }
  //this is called when click on edit button
  updateContact(contact: any) {
    this.showForm = true;
    this.isUpdateContact = true;
    //alert(contact.firstName);
    this.id =contact.id;
    this.firstName = contact.firstName;
    this.lastName = contact.lastName;
    this.address = contact.address;
    this.phone = contact.phone;
    this.emailAddress = contact.emailAddress;
  }
  // this is called when update the fields and click on update
  updateContactConfirm() {
    let contactObject = { id:this.id, firstName: this.firstName, lastName: this.lastName, phone:this.phone, emailAddress:this.emailAddress, address:this.address};
    this.contactService.updateContact(contactObject).subscribe((data: any) => {

      console.log("Response " +JSON.stringify(data, null, 2));
      
    
      this.getContactsFromAPI();
      this.isUpdateContact = false;
      this.showForm = false;
      console.log(data);
    });
  }

  //this is called when click on add new contact
createContact(){
  //alert("clcked");
  this.showForm =true;
  this.firstName = '';
  this.lastName = '';
  this.address = '';
  this.phone = '';
  this.emailAddress = '';
  
}
  

  //this is called when we click on delete button
  deleteContact(contact) {
    this.contactService.deleteContact(contact).subscribe((data: any) => {

      console.log("Response " +JSON.stringify(data, null, 2));
      
      // this.contacts = data;
      this.getContactsFromAPI();
      this.isUpdateContact = false;
      this.showForm = false;
      console.log(data);
    });

    this.contactService.deleteContact(contact);
    
  }

  
}
