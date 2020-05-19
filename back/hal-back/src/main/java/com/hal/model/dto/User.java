package com.hal.model.dto;

public class User {
	private int uid;
	private String name;
	private String birth;
	private int gender;
	private String phone;
	private String addr;
	private String profile_img;
	private String login_img;
	private double latitude;
	private double longitude;
	

	public User() {
		super();
	}
	
	public User(String name, String birth, int gender, String phone, String addr, String profile_img,
			String login_img, double latitude, double longitude) {
		super();
		this.name = name;
		this.birth = birth;
		this.gender = gender;
		this.phone = phone;
		this.addr = addr;
		this.profile_img = profile_img;
		this.login_img = login_img;
		this.latitude = latitude;
		this.longitude = longitude;
	}


	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public int getGender() {
		return gender;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getProfile_img() {
		return profile_img;
	}
	public void setProfile_img(String profile_img) {
		this.profile_img = profile_img;
	}
	public String getLogin_img() {
		return login_img;
	}
	public void setLogin_img(String login_img) {
		this.login_img = login_img;
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
	
	
}
