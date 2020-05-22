package com.hal.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hal.model.dto.User;

public interface UserRepository extends JpaRepository<User, Integer>{

	List<User> findAll();
	
	List<User> findByUidNot(int uid);
}
