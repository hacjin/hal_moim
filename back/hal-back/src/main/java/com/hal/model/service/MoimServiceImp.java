package com.hal.model.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hal.model.dao.MoimRepository;
import com.hal.model.dao.ParticipateRepository;
import com.hal.model.dao.UserRepository;
import com.hal.model.dto.Moim;
import com.hal.model.dto.MoimResponseDto;
import com.hal.model.dto.Participate;
import com.hal.model.dto.ParticipateResponseDto;
import com.hal.model.dto.User;

@Service
public class MoimServiceImp implements MoimService {

	@Autowired
	UserRepository ur;
	@Autowired
	MoimRepository mr;
	@Autowired
	ParticipateRepository pr;
	
	// dis_filter는 거리기반 1,3,5km
	@Override
	public List<MoimResponseDto> findMoimByDist(int uid,int dis_filter) {
		User client = ur.findById(uid).orElseThrow(IllegalArgumentException::new);
		List<Moim> moims = mr.findByHostNot(client);
		List<MoimResponseDto> result = new ArrayList<>();
		double user_lat = client.getLatitude();
		double user_long = client.getLongitude();
		
		double radius = 6371; // 지구 반지름(km)
	    double toRadian = Math.PI / 180;
	    
	    double distance;
		for (Moim moim : moims) {
			double moim_lat = moim.getLatitude();
			double moim_long = moim.getLongitude();
			double deltaLatitude = Math.abs(user_lat - moim_lat) * toRadian;
		    double deltaLongitude = Math.abs(user_long - moim_long) * toRadian;

		    double sinDeltaLat = Math.sin(deltaLatitude / 2);
		    double sinDeltaLng = Math.sin(deltaLongitude / 2);
		    double squareRoot = Math.sqrt(
		        sinDeltaLat * sinDeltaLat +
		        Math.cos(user_lat * toRadian) * Math.cos(moim_lat * toRadian) * sinDeltaLng * sinDeltaLng);

		    distance = 2 * radius * Math.asin(squareRoot);
		    if(distance <= dis_filter) {
		    	MoimResponseDto tmpMoim = MoimResponseDto.builder()
		    			.mid(moim.getMid())
		    			.title(moim.getTitle())
		    			.time(moim.getTime())
		    			.location(moim.getLocation())
		    			.state(moim.isState())
		    			.latitude(moim_lat)
		    			.longitude(moim_long)
		    			.host(moim.getHost())
		    			.distance(Math.round(distance*10)/10.0)
		    			.count(pr.countByMoimMid(moim.getMid()))
		    			.build();
		    	result.add(tmpMoim);
		    }
		}
		// result distance로 정렬
		Collections.sort(result, new Comparator<MoimResponseDto>() {
			@Override
			public int compare(MoimResponseDto o1, MoimResponseDto o2) {
				return (int)(o1.getDistance()-o2.getDistance());
			}
		});
		return result;
	}

	@Override
	public Moim addMoim(Moim moim) {
		return mr.save(moim);
	}

	@Override
	public Moim updateMoim(Moim moim) {
		moim.closeRoom();
		return mr.save(moim);
	}

	@Override
	public ParticipateResponseDto deleteParticipate(int uid, int mid) {
		Participate pc = pr.findByUserUidAndMoimMid(uid, mid);
		pr.delete(pc);
		ParticipateResponseDto result = ParticipateResponseDto.builder()
				.pid(pc.getPid())
				.user(pc.getUser())
				.moim(pc.getMoim())
				.build();
		return result;
	}
	@Override
	public ParticipateResponseDto addParticipate(Participate part) {
		pr.save(part);
		ParticipateResponseDto result = ParticipateResponseDto.builder()
				.pid(part.getPid())
				.user(part.getUser())
				.moim(part.getMoim())
				.build();
		return result;
	}

	@Override
	public List<Participate> findUsersByMid(int mid) {
		return pr.findByMoimMid(mid);
	}

}
