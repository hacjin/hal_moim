package com.hal.model.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int uid;
	
	private String name;
	private String birth;
	private int gender;
	private String phone;
	private String addr;
	@Column(name = "profile_img")
	private String profileImg;
	@Column(name = "login_img")
	private String loginImg;
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
		this.profileImg = profile_img;
		this.loginImg = login_img;
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
		return profileImg;
	}
	public void setProfile_img(String profile_img) {
		this.profileImg = profile_img;
	}
	public String getLogin_img() {
		return loginImg;
	}
	public void setLogin_img(String login_img) {
		this.loginImg = login_img;
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
