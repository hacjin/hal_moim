package com.hal.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hal.model.dto.Chat;
import com.hal.model.dto.ChatRequestDto;
import com.hal.model.service.ChatService;
import com.hal.model.service.RoomService;

import io.swagger.annotations.ApiOperation;

import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/chat")
public class ChatController {
	
	@Autowired
	private RoomService rservice;
	@Autowired
	private ChatService cservice;

	/**이벤트 trigger방식(2가지)
	 * 1. client소켓에서 sendMessage함수로 메시지 보낼경우 @MessageMapping으로 받을 수 있음
	 * 2. GET사용할때는 @RequestMapping 사용
	 * 
	 * 메시지 응답방식(2가지)
	 * 1. @SendTo를 사용하여 해당 topics를 수싲하는 client websocket에 메시지 전달
	 * 	  리턴타입 정의해야함, 리턴을 통해 client에 메시지 전달
	 * 2. SimpMessagingTemplate사용
	 *    리턴값은 void로 처리해야함
	 */
    @MessageMapping("/sendMessage/{rid}")
    @SendTo("/topic/roomId/{rid}")
    public ChatRequestDto sendMessage(@Payload ChatRequestDto chat) {
    	//메세지 db에 넣기
    	cservice.save(chat);
    	
    	// 저장 완료
        return chat;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public Chat addUser(@Payload Chat chatMessage, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }
    
    

    @ApiOperation(value = "chat 목록 조회")
    @GetMapping("/findChatListById")
    public ResponseEntity<Map<String, Object>> findChatListById(@RequestParam int rid) throws Exception {
    	return handleSuccess(cservice.findChatListById(rid)); 
    }
    
    
	@ApiOperation(value = "chat room 목록 조회")
	@GetMapping("/findRoomListById")
	public ResponseEntity<Map<String, Object>> findRoomListById(@RequestParam int uid) throws Exception {
		return handleSuccess(rservice.findRoomListById(uid)); 
	}
	
	@ApiOperation(value = "chat room 만들기")
	@GetMapping("/addRoom")
	public ResponseEntity<Map<String, Object>> addRoom(@RequestParam int senderId,@RequestParam int receiverId) throws Exception {
		//방이 있는지 없는지 확인하고 없으면 방 만들어줌, 리턴값은 room id
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