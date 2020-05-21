package com.hal.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hal.model.dto.Room;
import com.hal.model.dto.User;

public interface RoomRepository extends JpaRepository<Room, Integer>{

	//내가 참여한 채팅방 리스트
	List<Room> findBySender(User user);
	List<Room> findByReceiver(User user);
	
	//존재하는 채팅방인지 확인
	@Query("select count(*) from room where uid1 = :#{#sender.uid} and uid2 = :#{#receiver.uid}")
	int numOfRoom();
	//채팅방 만들기
//	@Query("insert into user(uid1, uid2) values (:#{#sender.uid} ,:#{#receiver.uid}) ")
//	void addRoom(User sender, User receiver);
	
}
