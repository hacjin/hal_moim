package com.hal.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hal.model.dto.Chat;
import com.hal.model.dto.User;
import com.hal.model.service.RoomService;

import io.swagger.annotations.ApiOperation;

import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

@RestController
@RequestMapping("/chat")
public class ChatController {
	
	@Autowired
	private RoomService rservice;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public Chat sendMessage(@Payload Chat chatMessage) {
    	//메세지 db에 넣기
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public Chat addUser(@Payload Chat chatMessage, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }
    

	@ApiOperation(value = "chat room 목록 조회")
	@GetMapping("/findRoomListById")
	public ResponseEntity<Map<String, Object>> findRoomListById(int uid) throws Exception {
		return handleSuccess(rservice.findRoomListById(uid)); 
	}
	
	@ApiOperation(value = "chat room 만들기")
	@GetMapping("/addRoom")
	public ResponseEntity<Map<String, Object>> addRoom(@RequestParam int senderId,@RequestParam  int receiverId) throws Exception {
		return handleSuccess(rservice.addRoom(senderId,receiverId)); 
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