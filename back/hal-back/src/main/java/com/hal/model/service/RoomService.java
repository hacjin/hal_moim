package com.hal.model.service;

import java.util.List;

import com.hal.model.dto.Room;
import com.hal.model.dto.User;

public interface RoomService {

	public List<Room> findRoomListById(User user);
}
