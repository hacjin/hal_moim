package com.hal.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hal.model.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userServiceImp;
	
	@ApiOperation(value = "모든 User 목록 조회")
	@GetMapping("/userAllList")
	public ResponseEntity<Map<String, Object>> userSearchAllList() throws Exception {
	    return handleSuccess(userServiceImp.userSearchAllList());
	}

	@ApiOperation(value = "모든 Friend 조회")
	@GetMapping("/friendsByDistance")
	public ResponseEntity<Map<String, Object>> friendsAllList(@RequestParam int uid, @RequestParam int dis_filter) throws Exception {
	    return handleSuccess(userServiceImp.findFriendByDistance(uid, dis_filter));
	}
	
	
	// Fail
	public ResponseEntity<Map<String, Object>> handleFail(Object data, HttpStatus state) {
	    Map<String, Object> resultMap = new HashMap<String, Object>();
	    resultMap.put("state", "fail");
	    resultMap.put("data", data);
	    return new ResponseEntity<Map<String, Object>>(resultMap, state);
	}

	// Success
	public ResponseEntity<Map<String, Object>> handleSuccess(Object data) {
	    Map<String, Object> resultMap = new HashMap<String, Object>();
	    resultMap.put("state", "ok");
	    resultMap.put("data", data);
	    return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
}
