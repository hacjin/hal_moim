package com.hal.model.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hal.model.dao.ChatRepository;
import com.hal.model.dao.MoimRepository;
import com.hal.model.dao.ParticipateRepository;
import com.hal.model.dao.RoomRepository;
import com.hal.model.dao.UserRepository;
import com.hal.model.dto.Chat;
import com.hal.model.dto.ChatRequestDto;
import com.hal.model.dto.Moim;
import com.hal.model.dto.MoimResponseDto;
import com.hal.model.dto.Participate;
import com.hal.model.dto.ParticipateRequestDto;
import com.hal.model.dto.ParticipateResponseDto;
import com.hal.model.dto.Room;
import com.hal.model.dto.User;

@Service
public class ChatServiceImp implements ChatService {

	@Autowired
	UserRepository ur;
	@Autowired
	ChatRepository cr;
	@Autowired
	RoomRepository rr;
	
	// 채팅 메시지 저장
	@Override
	public void save(ChatRequestDto request) {
		try {
			User user = ur.findById(request.getSenderId()).orElseThrow(IllegalArgumentException::new);
			Room room = rr.findById(request.getRoomId()).orElseThrow(IllegalArgumentException::new);
			Chat chat = request.toEntity(request,room, user);
			cr.save(chat);
		} catch (Exception e) {
			String msg = e.getMessage();
		}

	}

}
