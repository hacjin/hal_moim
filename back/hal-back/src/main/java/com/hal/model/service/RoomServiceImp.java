package com.hal.model.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hal.model.dao.RoomRepository;
import com.hal.model.dto.MoimResponseDto;
import com.hal.model.dto.Room;
import com.hal.model.dto.RoomResponseDto;
import com.hal.model.dto.User;

@Service
public class RoomServiceImp implements RoomService {

	@Autowired
	private RoomRepository roomRepository;
	
	public List<RoomResponseDto> findRoomListById(int uid){
		List<RoomResponseDto> roomList = new LinkedList<>();
		List<Room> tmpList = new LinkedList<>();
		
		tmpList = roomRepository.findByUser1Uid(uid); 
		for (Room room : tmpList) {
			RoomResponseDto tmproom = RoomResponseDto.builder()
					.rid(room.getRid())
					.sender(room.getUser1())
					.receiver(room.getUser2()).build();
			roomList.add(tmproom);
		}
		
		tmpList = roomRepository.findByUser2Uid(uid); 
		for (Room room : tmpList) {
			RoomResponseDto tmproom = RoomResponseDto.builder()
					.rid(room.getRid())
					.sender(room.getUser2())
					.receiver(room.getUser1()).build();
			roomList.add(tmproom);
		}
		
		return roomList;
	}
	
	@Override
	public String addRoom(User sender, User receiver) {
		roomRepository.numOfRoom();
//		roomRepository.addRoom(sender, receiver);
		return "ok";
	}
}
