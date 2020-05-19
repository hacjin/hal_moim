package com.hal.model.dto;

public class Participate {
	private int pid;
	private Moim mid;
	private User uid;
	
	public Participate() {}
	public Participate(int pid, Moim mid, User uid) {
		super();
		this.pid = pid;
		this.mid = mid;
		this.uid = uid;
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
		return uid;
	}
	public void setUid(User uid) {
		this.uid = uid;
	}
	
	
}
