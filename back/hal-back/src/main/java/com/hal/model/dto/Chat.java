package com.hal.model.dto;

import java.util.Date;

public class Chat {
	private int cid;
	private String message;
	private Date time;
	private boolean status; //읽음 , 안읽
	private Room room;
	private User sender;
	
	public Chat() {}
	public Chat(int cid, String message, Date time, boolean status, Room room, User sender) {
		super();
		this.cid = cid;
		this.message = message;
		this.time = time;
		this.status = status;
		this.room = room;
		this.sender = sender;
	}
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public Room getRoom() {
		return room;
	}
	public void setRoom(Room room) {
		this.room = room;
	}
	public User getSender() {
		return sender;
	}
	public void setSender(User sender) {
		this.sender = sender;
	}
	
	

}
