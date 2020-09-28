package com.addressbook.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.addressbook.springboot.exception.ContactNotFoundException;

import com.addressbook.springboot.entity.Contact;
import com.addressbook.springboot.repository.ContactRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {
	
	@Autowired
	private ContactRepository contactRepository;

	//get contacts
	@GetMapping("/api/contacts")
	public List<Contact> getAllContacts(){
		return contactRepository.findAll();
		
	}
	
	
	//get contacts by id
	@GetMapping("/api/contacts/{id}")
	public Contact getContactbyId(@PathVariable Long id){
		return contactRepository.findById(id).orElseThrow(() -> new ContactNotFoundException("Contact is not found with id :"+id));
		 
	}
	
	
	//create contact
	@PostMapping("/api/contacts/")
	public Contact createContact(@RequestBody Contact contact) {
	//	System.out.println("============create contact and conatct is"+contact);
		return contactRepository.save(contact);
		
	}
	
	// update contact by id
	@PutMapping("/api/contacts/{id}")
	public Contact updateContact(@RequestBody Contact contact, @PathVariable Long id) {
		//System.out.println("============update contact id is"+id);
		//System.out.println("============update contact conatct is"+contact);
		
		Contact existingcontact =contactRepository.findById(id).orElseThrow(() -> new ContactNotFoundException("Contact is not found with id :"+id));
	
		existingcontact.setAddress(contact.getAddress());
		existingcontact.setEmailAddress(contact.getEmailAddress());
		existingcontact.setFirstName(contact.getFirstName());
		existingcontact.setLastName(contact.getLastName());
		existingcontact.setPhone(contact.getPhone());
		
		return contactRepository.save(existingcontact);
		
	}
	
	
	//delete contact
	@DeleteMapping("/api/contacts/{id}")
	public ResponseEntity<Contact>   deleteContact( @PathVariable Long id) {
		System.out.println("============delete contact id is"+id);
		//System.out.println("============delete contact conatct is"+contact);
		contactRepository.findById(id).orElseThrow(() -> new ContactNotFoundException("Contact is not found with id :"+id));
		contactRepository.deleteById(id);
		return ResponseEntity.ok().build();
	} 
	
	
	
	

}
