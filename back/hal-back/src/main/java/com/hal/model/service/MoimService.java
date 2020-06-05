package com.hal.model.service;

import java.util.List;

import com.hal.model.dto.Moim;
import com.hal.model.dto.MoimRequestDto;
import com.hal.model.dto.MoimResponseDto;
import com.hal.model.dto.Participate;
import com.hal.model.dto.ParticipateRequestDto;
import com.hal.model.dto.ParticipateResponseDto;

public interface MoimService {
	// 사용자 위치를 기준으로 거리기반의 모임들을 불러오는 메소드 => 참여 인원 조회 추가
	public List<MoimResponseDto> findMoimByDist(int uid,int dis_filter);
	// 사용자 번호와 form에서 넘어온 모임정보를 통해 모임방 만들기
	public Moim addMoim(Moim moim);
	// 모임방 상태 수정 ( front에서 넘어오는 파라미터를 판단해서 매개변수 바꾸어 줄 것 )
	public Moim updateMoim(Moim moim);
	// 모임 참여 여부 기능 ( insert )
	public ParticipateResponseDto addParticipate(ParticipateRequestDto part);
	// 모임 참여 여부 기능 ( delete )
	public ParticipateResponseDto deleteParticipate(int uid,int mid);
	// 모임에 참여한 유저 목록 전체 조회
	public List<Participate> findUsersByMid(int mid);
	// 사용자 번호로 해당 유저가 생성한 모임 목록 조회
	public List<Moim> findMoimByMe(int uid);
	// 사용자 번호로 해당 유저가 참여한 모임 목록 조회
	public List<Moim> findMoimByOther(int uid);
}
