package com.hal.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hal.model.dto.User;
//import com.hal.model.service.ImageService;
import com.hal.model.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userServiceImp;
	//@Autowired
	//private ImageService imageService;
	
	@ApiOperation(value = "모든 User 목록 조회")
	@GetMapping("/userlist")
	public ResponseEntity<Map<String, Object>> userSearchAllList() throws Exception {
	    return handleSuccess(userServiceImp.userSearchAllList());
	}
	
	@ApiOperation(value = "회원가입")
	@PostMapping("/add-user")
	public ResponseEntity<Map<String, Object>> addUser(@RequestParam(value="name", required = false) String name
													,  @RequestParam(value="birth", required = false) String birth
													,  @RequestParam(value="gender", required = false) String gender
													,  @RequestParam(value="phone", required = false) String phone
													,  @RequestParam(value="addr", required = false) String addr
													,  @RequestParam(value="myImg", required = false) MultipartFile myImg
													,  @RequestParam(value="latitude", required = false) String latitude
													,  @RequestParam(value="longitude", required = false) String longitude
													) throws Exception {		
		
		User user = new User(0, name, birth, Integer.parseInt(gender), phone, addr, "tmpProfile" ,myImg.getOriginalFilename() 
				, Double.parseDouble(latitude), Double.parseDouble(longitude));
		
		//imageService.saveMyImage(myImg);
		
	    return handleSuccess(userServiceImp.addUser(user));
	}
	
	@ApiOperation(value = "로그인")
	@GetMapping("/login")
	public ResponseEntity<Map<String, Object>> userLogin(@RequestParam(value="phone", required = true) String phone) throws Exception {
	    return handleSuccess(userServiceImp.userLogin(phone));
	}
	
	@ApiOperation(value = "모든 Friend 조회")
	@GetMapping("/friendsByDistance")
	public ResponseEntity<Map<String, Object>> friendsAllList(@RequestParam int uid, @RequestParam int dis_filter) throws Exception {
	    System.out.println("friendsData:::::::::::"+uid);
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
