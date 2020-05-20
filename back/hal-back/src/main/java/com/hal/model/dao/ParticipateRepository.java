package com.hal.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hal.model.dto.Participate;
import com.hal.model.dto.User;

public interface ParticipateRepository extends JpaRepository<Participate, Integer> {
	// 해당모임에 포함된 유저수
	int countByMid(int mid);
	// 해당유저가 참여에 포함되어있는지 여부
	Participate findByUserUid(int uid);
	// 해당 모임에 참여한 유저 목록
	List<User> findByMid(int mid);
}
