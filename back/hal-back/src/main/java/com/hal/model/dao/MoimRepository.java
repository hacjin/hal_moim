package com.hal.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hal.model.dto.Moim;

public interface MoimRepository extends JpaRepository<Moim, Integer> {
	// 쿼리문을 => 메소드 형식으로 쓰이게 해주는겁니다!!
	List<Moim> findById(int mid);
}
