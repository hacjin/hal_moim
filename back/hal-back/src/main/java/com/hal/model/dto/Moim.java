package com.hal.model.dto;

import java.util.Date;

public class Moim {
	private int mid;
	private String title;
	private Date time;
	private String location;
	private boolean state; //������ ����ִ��� �����ߴ���
	private double latitude;
	private double longitude;
	private User host; //host ����
	
	public Moim() {}
	public Moim(int mid, String title, Date time, String location, boolean state, double latitude, double longitude,
			User user) {
		super();
		this.mid = mid;
		this.title = title;
		this.time = time;
		this.location = location;
		this.state = state;
		this.latitude = latitude;
		this.longitude = longitude;
		this.host = user;
	}

	public int getMid() {
		return mid;
	}

	public void setMid(int mid) {
		this.mid = mid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public boolean isState() {
		return state;
	}

	public void setState(boolean state) {
		this.state = state;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public User getUser() {
		return host;
	}

	public void setUser(User user) {
		this.host = user;
	}
	
	

}
