package com.hal.model.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.hal.model.dao.UserRepository;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class MoimRequestDto {
	private int mid;
	private String title;
	private Date time;
	private String location;
	private boolean state; // true : 모임 있는지, false: 방폭
	private double latitude;
	private double longitude;
	private int uid; // host 정보
	
	public Moim toEntity(User user, MoimRequestDto request) {
		Moim moim = new Moim(request.getMid()
				,request.getTitle()
				,new Date()
				,request.getLocation()
				,request.isState()
				,request.getLatitude()
				,request.getLongitude()
				,user);
		return moim;
	}
	
	public MoimResponseDto toResponse(Moim moim) {
		MoimResponseDto result = MoimResponseDto.builder()
				.mid(moim.getMid())
				.title(moim.getTitle())
				.time(moim.getTime())
				.state(moim.isState())
				.latitude(moim.getLatitude())
				.longitude(moim.getLongitude())
				.host(moim.getHost())
				.build();
		return result;
	}
}
