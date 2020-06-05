package com.hal.controller;

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

import com.hal.model.dto.Moim;
import com.hal.model.dto.MoimRequestDto;
import com.hal.model.dto.ParticipateRequestDto;
import com.hal.model.service.ImageService;
import com.hal.model.service.MoimService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
@RequestMapping("/moim")
public class MoimController {
	@Autowired
	private MoimService moimService;
	@Autowired
	private ImageService imgService;

	@ApiOperation(value = "거리기반 모임방 목록 전체 조회")
	@GetMapping("/allList")
	public ResponseEntity<Map<String, Object>> moimFindAllList(@RequestParam int uid, @RequestParam int dis_filter) {
		return new ResponseEntity<Map<String, Object>>(moimService.findMoimByDist(uid, dis_filter), HttpStatus.OK);
	}

	@ApiOperation(value = "모임방 만들기")
	@PostMapping("/add")
	public ResponseEntity<Map<String, Object>> moimAdd(@RequestParam(name = "mid") int mid,
			@RequestParam(name = "title") String title, @RequestParam(name = "time") String time,
			@RequestParam(name = "location") String location, @RequestParam(name = "state") boolean state,
			@RequestParam(name = "latitude") String latitude, @RequestParam(name = "longitude") String longitude,
			@RequestParam(name = "coment") String coment,
			@RequestParam(name = "file", required = false) MultipartFile file, @RequestParam(name = "uid") int uid) {
		String fileName = "";
		if (file != null) {
			fileName = "/images/moim/" + file.getOriginalFilename();
			imgService.saveImage(file, "moim");
		}else {
			fileName = "/images/moim/default.jpg";
		}
		MoimRequestDto requestMoim = new MoimRequestDto(0, title, time, location, state, Double.parseDouble(latitude),
				Double.parseDouble(longitude), coment, fileName, uid);
		return new ResponseEntity<Map<String, Object>>(moimService.addMoim(uid, requestMoim), HttpStatus.OK);
	}

	@ApiOperation(value = "모임방 상태 변화 (폭파)")
	@PutMapping("/state")
	public ResponseEntity<Map<String, Object>> moimUpdate(@RequestBody Moim moim) {
		return new ResponseEntity<Map<String, Object>>(moimService.updateMoim(moim), HttpStatus.OK);
	}

	@ApiOperation(value = "해당 모임에 특정 사용자 참여 추가 기능")
	@PostMapping("/participate")
	public ResponseEntity<Map<String, Object>> moimUpdateParticipate(@RequestBody ParticipateRequestDto part) {
		return new ResponseEntity<Map<String, Object>>(moimService.addParticipate(part), HttpStatus.OK);
	}

	@ApiOperation(value = "해당 모임에 특정 사용자 참여 삭제 기능")
	@DeleteMapping("/participate")
	public ResponseEntity<Map<String, Object>> moimUpdateParticipate(@RequestParam int uid, @RequestParam int mid) {
		return new ResponseEntity<Map<String, Object>>(moimService.deleteParticipate(uid, mid), HttpStatus.OK);
	}

	@ApiOperation(value = "해당 모임에 참여한 유저 목록 전체 조회")
	@GetMapping("/participateAllList")
	public ResponseEntity<Map<String, Object>> moimFindParticipateAllUsers(@RequestParam int mid) {
		return new ResponseEntity<Map<String, Object>>(moimService.findUsersByMid(mid), HttpStatus.OK);
	}

	@ApiOperation(value = "해당 유저가 참여한 모임 목록 조회")
	@GetMapping("/participateListByUser")
	public ResponseEntity<Map<String, Object>> moimFindParticipateByUsers(@RequestParam int uid) {
		return new ResponseEntity<Map<String, Object>>(moimService.findPartsByUid(uid), HttpStatus.OK);
	}
}
