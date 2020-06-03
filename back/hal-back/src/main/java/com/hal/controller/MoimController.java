package com.hal.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hal.model.dao.MoimRepository;
import com.hal.model.dao.ParticipateRepository;
import com.hal.model.dao.UserRepository;
import com.hal.model.dto.Moim;
import com.hal.model.dto.MoimRequestDto;
import com.hal.model.dto.MoimResponseDto;
import com.hal.model.dto.Participate;
import com.hal.model.dto.ParticipateRequestDto;
import com.hal.model.dto.ParticipateResponseDto;
import com.hal.model.dto.User;
import com.hal.model.dto.UserResponseDto;
import com.hal.model.service.MoimService;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/moim")
public class MoimController {
	private ParticipateRepository partRepository;
	private UserRepository userRepository;
	@Autowired
	private MoimService moimService;

	@ApiOperation(value = "거리기반 모임방 목록 전체 조회")
	@GetMapping("/allList")
	public ResponseEntity<Map<String, Object>> moimFindAllList(@RequestParam int uid, @RequestParam int dis_filter)
			throws Exception {
			return new ResponseEntity<Map<String, Object>>(moimService.findMoimByDist(uid, dis_filter), HttpStatus.OK);
	}

	@ApiOperation(value = "모임방 만들기")
	@PostMapping("/add")
	public ResponseEntity<Map<String, Object>> moimAdd(@RequestParam(name = "mid") int mid,@RequestParam(name="title") String title,@RequestParam(name="time") String time
			,@RequestParam(name="location") String location, @RequestParam(name="state") boolean state, @RequestParam(name="latitude") String latitude, @RequestParam(name="longitude") String longitude
			,@RequestParam(name="coment") String coment,@RequestParam(name="file",required = false) MultipartFile file, @RequestParam(name="uid") int uid) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Moim moim;
		try {
			User user = userRepository.findById(uid).orElseThrow(IllegalArgumentException::new);
			MoimRequestDto requestMoim = new MoimRequestDto(0,title,time,location,state,Double.parseDouble(latitude),Double.parseDouble(longitude),coment,file.getOriginalFilename(),uid);
			System.out.println(requestMoim.toString());
			moim = requestMoim.toEntity(user, requestMoim);
			Moim result = moimService.addMoim(moim);
			resultMap.put("state", "Success");
			resultMap.put("message", "모임방 생성 성공");
			resultMap.put("data", requestMoim.toResponse(result));
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
	@PutMapping("/state")
	public ResponseEntity<Map<String, Object>> moimUpdate(@RequestBody Moim moim) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
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

	@ApiOperation(value = "해당 모임에 특정 사용자 참여 추가 기능")
	@PostMapping("/participate")
	public ResponseEntity<Map<String, Object>> moimUpdateParticipate(@RequestBody ParticipateRequestDto part) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		ParticipateResponseDto data;
		try {
			data = moimService.addParticipate(part);
			resultMap.put("state", "Success");
			resultMap.put("message", "모임방 상태 추가 성공");
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
	@ApiOperation(value = "해당 모임에 특정 사용자 참여 삭제 기능")
	@DeleteMapping("/participate")
	public ResponseEntity<Map<String, Object>> moimUpdateParticipate(@RequestParam int uid, @RequestParam int mid) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		ParticipateResponseDto data;
		try {
			data = moimService.deleteParticipate(uid, mid);
			resultMap.put("state", "Success");
			resultMap.put("message", "모임방 상태 삭제 성공");
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
	
	@ApiOperation(value = "해당 유저가 참여한 모임 목록 조회")
	@GetMapping("/participateListByUser")
	public ResponseEntity<Map<String, Object>> moimFindParticipateByUsers(@RequestParam int uid) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			List<Participate> moims = partRepository.findAllByUserUid(uid);
			List<ParticipateResponseDto> data = new ArrayList<ParticipateResponseDto>();
			for (Participate part : moims) {
				ParticipateResponseDto tmpDto = ParticipateResponseDto.builder().pid(part.getPid()).user(part.getUser()).moim(part.getMoim()).build();
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
