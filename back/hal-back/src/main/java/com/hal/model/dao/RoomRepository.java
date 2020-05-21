package com.hal.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hal.model.dto.Room;
import com.hal.model.dto.User;

public interface RoomRepository extends JpaRepository<Room, Integer>{

	//내가 참여한 채팅방 리스트
	List<Room> findBySender(User user);
	List<Room> findByReceiver(User user);
	
}
