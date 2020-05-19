package com.hal.model.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "chat")
public class Chat {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cid;
	private String message;
	private Date time;
	private boolean state; //true: 읽음, false: 안읽음
	@ManyToOne
	@JoinColumn(name = "room_rid", updatable = false, insertable = false)
	private Room room;
	
	@ManyToOne
	@JoinColumn(name = "user_uid", updatable = false, insertable = false)
	private User sender;
	
	public Chat() {}
	public Chat(int cid, String message, Date time, boolean status, Room room, User sender) {
		super();
		this.cid = cid;
		this.message = message;
		this.time = time;
		this.state = status;
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
		return state;
	}
	public void setStatus(boolean status) {
		this.state = status;
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
