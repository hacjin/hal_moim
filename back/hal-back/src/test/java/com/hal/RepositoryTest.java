package com.hal;

import org.junit.Test;

import com.hal.model.dto.User;
import com.hal.model.service.MoimService;
import com.hal.model.service.MoimServiceImp;


public class RepositoryTest {
	@Test
	public void MoimRepo() {
		MoimService ms = new MoimServiceImp();
		ms.findMoimByDist(new User(),1);
		
	}
}
