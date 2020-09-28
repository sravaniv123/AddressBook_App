package com.addressbook.springboot.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.addressbook.springboot.entity.Contact;

@Repository
public interface ContactRepository  extends JpaRepository<Contact,Long>{

	//List<Contact> findByLastNameStartingWith(String string);

}
