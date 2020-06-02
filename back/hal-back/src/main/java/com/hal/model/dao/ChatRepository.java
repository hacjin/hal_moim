package com.hal.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hal.model.dto.Chat;
import com.hal.model.dto.Room;
import com.hal.model.dto.User;

public interface ChatRepository extends JpaRepository<Chat, Integer>{
	List<Chat> findByRoomRidOrderByTime(int rid);
}
