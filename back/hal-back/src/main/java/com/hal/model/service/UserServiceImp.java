package com.hal.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hal.model.dao.UserRepository;
import com.hal.model.dto.User;

@Service
public class UserServiceImp implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	
	@Override
	public List<User> userSearchAllList() {
		return userRepository.findAll();
	}

	
}
