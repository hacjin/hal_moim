package com.hal.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hal.model.dao.UserRepository;
import com.hal.model.dto.User;
import com.hal.model.service.MoimService;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/moim")
public class MoimController {
	private UserRepository userRepository;
	@Autowired
	private MoimService moimService;
	
	@ApiOperation(value = "거리기반 모임방 목록 전체 조회")
	@GetMapping("/allList")
	public ResponseEntity<Map<String,Object>> moimFindAllList(@RequestParam int uid, @RequestParam int dis_filter) throws Exception {
		User user = userRepository.findById(uid).orElseThrow(IllegalArgumentException::new);
		Map<String, Object> resultMap = new HashMap<String, Object>();
	    resultMap.put("state", "fail");
	    resultMap.put("data", moimService.findMoimByDist(user, dis_filter));
	    return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
} 
