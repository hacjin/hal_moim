package com.hal.model.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "uid")
	private int uid;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "birth")
	private String birth;
	
	@Column(name = "gender")
	private int gender;
	
	@Column(name = "phone")
	private String phone;
	
	@Column(name = "addr")
	private String addr;
	
	@Column(name = "profile_img")
	private String profileImg;
	
	@Column(name = "login_img")
	private String loginImg;
	
	@Column(name = "latitude")
	private double latitude;
	
	@Column(name = "longitude")
	private double longitude;
	
	
}
