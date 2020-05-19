package com.hal.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hal.model.dto.Moim;

public interface MoimRepository extends JpaRepository<Moim, Integer> {
	List<Moim> findAllById();
}
