package com.hal.model.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ChatRequestDto {
	private int cid;
	private String message;
	private Date time;
	private boolean state; //true: 읽음, false: 안읽음
	private int roomId;
	private int senderId;
	
	public Chat toEntity(ChatRequestDto request, Room room, User sender) {
		Chat chat = new Chat(request.getCid(), 
							request.getMessage(), 
							request.getTime(), 
							request.isState(), 
							room, 
							sender);
		return chat;
	}
}
