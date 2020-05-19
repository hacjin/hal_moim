package com.hal.model.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "participate")
public class Participate {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pid;
	
	@ManyToOne
	@JoinColumn(name = "moim_mid")
	private Moim mid;
	@ManyToOne
	@JoinColumn(name = "user_uid")
	private User user;
	
	public Participate() {}
	public Participate(int pid, Moim mid, User uid) {
		super();
		this.pid = pid;
		this.mid = mid;
		this.user = uid;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public Moim getMid() {
		return mid;
	}
	public void setMid(Moim mid) {
		this.mid = mid;
	}
	public User getUid() {
		return user;
	}
	public void setUid(User uid) {
		this.user = uid;
	}
	
	
}
