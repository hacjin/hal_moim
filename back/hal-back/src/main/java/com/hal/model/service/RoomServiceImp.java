package com.hal.model.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hal.model.dao.RoomRepository;
import com.hal.model.dto.Room;
import com.hal.model.dto.User;

@Service
public class RoomServiceImp implements RoomService {

	@Autowired
	private RoomRepository roomRepository;
	
	public List<Room> findRoomListById(User user){
		List<Room> roomList = new LinkedList<>();
		List<Room> tmpList = new LinkedList<>();
		
		roomList = roomRepository.findBySender(user); //user가 Sender로 받아짐
		tmpList = roomRepository.findByReceiver(user); //user가 Receiver로 받아짐
		for(int i=0; i<tmpList.size(); i++) {
			Room room = tmpList.get(i);
			User receiver = room.getSender();
//			room.setReceiver(receiver);
//			room.setSender(user);
			roomList.add(room);
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
