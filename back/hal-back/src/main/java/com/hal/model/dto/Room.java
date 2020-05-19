package com.hal.model.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "room")
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int rid;
	
	@ManyToOne
	@JoinColumn(name = "user_uid")
	private User sender;
	
	@ManyToOne
	@JoinColumn(name = "user_uid")
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
