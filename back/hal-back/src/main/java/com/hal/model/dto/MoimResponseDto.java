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
public class MoimResponseDto {
	private int mid;
	private String title;
	private Date time;
	private String location;
	private boolean state; // true : 모임 있는지, false: 방폭
	private double latitude;
	private double longitude;
	private User host; // host 정보
	private double distance;
	private int count;
	
//	@Builder
//	public MoimResponseDto(int mid, String title, Date time, String location, boolean state, double latitude,
//			double longitude, User host, double distance, int count) {
//		super();
//		this.mid = mid;
//		this.title = title;
//		this.time = time;
//		this.location = location;
//		this.state = state;
//		this.latitude = latitude;
//		this.longitude = longitude;
//		this.host = host;
//		this.distance = distance;
//		this.count = count;
//	}

	

}
