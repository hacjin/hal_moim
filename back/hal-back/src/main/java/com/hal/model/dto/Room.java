package com.hal.model.dto;

public class Room {
	private int rid;
	private User sender;
	private User receiver;
	
	public Room() {}
	public Room(int rid, User sender, User receiver) {
		super();
		this.rid = rid;
		this.sender = sender;
		this.receiver = receiver;
	}
	public int getRid() {
		return rid;
	}
	public void setRid(int rid) {
		this.rid = rid;
	}
	public User getSender() {
		return sender;
	}
	public void setSender(User sender) {
		this.sender = sender;
	}
	public User getReceiver() {
		return receiver;
	}
	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}
	
	
}
