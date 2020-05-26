package com.hal.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hal.model.dao.MoimRepository;
import com.hal.model.dao.UserRepository;
import com.hal.model.dto.Moim;
import com.hal.model.dto.MoimRequestDto;
import com.hal.model.dto.MoimResponseDto;
import com.hal.model.dto.Participate;
import com.hal.model.dto.ParticipateResponseDto;
import com.hal.model.dto.User;
import com.hal.model.dto.UserResponseDto;
import com.hal.model.service.MoimService;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/moim")
public class MoimController {
	private UserRepository userRepository;
	private MoimRepository moimRepository;
	@Autowired
	private MoimService moimService;

	@ApiOperation(value = "거리기반 모임방 목록 전체 조회")
	@GetMapping("/allList")
	public ResponseEntity<Map<String, Object>> moimFindAllList(@RequestParam int uid, @RequestParam int dis_filter)
			throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
//			User user = userRepository.findById(uid).orElseThrow(IllegalArgumentException::new);
			resultMap.put("state", "Success");
			resultMap.put("data", moimService.findMoimByDist(uid, dis_filter));
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			String msg = e.getMessage();
			resultMap.put("state", "Client Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.NOT_FOUND);
		}
	}

	@ApiOperation(value = "모임방 만들기")
	@PostMapping("/add")
	public ResponseEntity<Map<String, Object>> moimAdd(@RequestBody MoimRequestDto requestMoim) {
		System.out.println(requestMoim.toString());
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Moim moim;
		try {
			User user = userRepository.findById(requestMoim.getUid()).orElseThrow(IllegalArgumentException::new);
			moim = requestMoim.toEntity(user, requestMoim);
//			moim = new Moim(requestMoim.getMid(), requestMoim.getTitle(), new Date(), requestMoim.getLocation(),
//					requestMoim.isState(), requestMoim.getLatitude(), requestMoim.getLongitude(), user);
			moimService.addMoim(moim);
			resultMap.put("state", "Success");
			resultMap.put("message", "모임방 생성 성공");
			resultMap.put("data", requestMoim.toResponse(moim));
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			String msg = e.getMessage();
			resultMap.put("state", "Server Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "모임방 상태 변화 (폭파)")
	@GetMapping("/updateState")
	public ResponseEntity<Map<String, Object>> moimUpdate(@RequestParam int mid) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Moim moim;
		try {
			moim = moimRepository.findById(mid);
			moim.closeRoom();
			moimService.updateMoim(moim);
			MoimResponseDto data = MoimResponseDto.builder()
					.mid(moim.getMid())
					.title(moim.getTitle())
					.location(moim.getLocation())
					.state(moim.isState())
					.latitude(moim.getLatitude())
					.longitude(moim.getLongitude())
					.build();
			resultMap.put("state", "Success");
			resultMap.put("message", "모임방 상태 수정 성공");
			resultMap.put("data", data);
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			String msg = e.getMessage();
			resultMap.put("state", "Server Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "해당 모임에 특정 사용자 참여 추가/삭제 기능")
	@GetMapping("/updateParticipate")
	public ResponseEntity<Map<String, Object>> moimUpdateParticipate(@RequestParam int uid, @RequestParam int mid,
			@RequestParam int check) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		ParticipateResponseDto data;
		try {
			data = moimService.updateParticipate(uid, mid, check);
			resultMap.put("state", "Success");
			resultMap.put("message", "모임방 상태 수정 성공");
			resultMap.put("data", data);
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			String msg = e.getMessage();
			resultMap.put("state", "Server Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation(value = "해당 모임에 참여한 유저 목록 전체 조회")
	@GetMapping("/participateAllList")
	public ResponseEntity<Map<String, Object>> moimFindParticipateAllUsers(@RequestParam int mid) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			List<Participate> users = moimService.findUsersByMid(mid);
			List<UserResponseDto> data = new ArrayList<UserResponseDto>();
			for (Participate part : users) {
				User user = userRepository.findById(part.getUser().getUid()).orElseThrow(IllegalArgumentException::new);
				UserResponseDto tmpDto = UserResponseDto.builder().uid(user.getUid()).name(user.getName())
						.birth(user.getBirth()).gender(user.getGender()).phone(user.getPhone()).addr(user.getAddr())
						.profileImg(user.getProfileImg()).loginImg(user.getLoginImg()).latitude(user.getLatitude())
						.longitude(user.getLongitude()).build();
				data.add(tmpDto);
			}
			resultMap.put("state", "Success");
			resultMap.put("message", "모임방 상태 수정 성공");
			resultMap.put("data", data);
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		} catch (Exception e) {
			String msg = e.getMessage();
			resultMap.put("state", "Client Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.NOT_FOUND);
		}
	}
}
