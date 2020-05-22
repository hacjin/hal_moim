package com.hal.model.service;

import java.util.List;

import com.hal.model.dto.Room;
import com.hal.model.dto.RoomResponseDto;
import com.hal.model.dto.User;

public interface RoomService {

	public List<RoomResponseDto> findRoomListById(int uid);

	public String addRoom(int senderId, int receiverId);
}
