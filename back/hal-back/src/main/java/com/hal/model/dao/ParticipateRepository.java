package com.hal.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hal.model.dto.Participate;

public interface ParticipateRepository extends JpaRepository<Participate, Integer> {
	int countByMoimMid(int mid);
}
