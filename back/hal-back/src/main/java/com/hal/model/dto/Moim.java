package com.hal.model.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "moim")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@ToString
public class Moim {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "mid")
	private int mid;

	@Column(name = "title")
	private String title;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "time")
	private Date time;

	@Column(name = "location")
	private String location;

	@Column(name = "state")
	private boolean state; // true : 모임 있는지, false: 방폭
	
	@Column(name = "latitude")
	private double latitude;
	
	@Column(name = "longitude")
	private double longitude;

	@OneToOne
	@JoinColumn(name = "uid",referencedColumnName = "uid", updatable = false, insertable = false)
	private User host; // host 정보
	
	public void closeRoom() {
		this.state = false;
	}

}
