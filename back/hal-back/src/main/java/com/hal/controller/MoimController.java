package com.hal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hal.model.service.MoimService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/moim")
public class MoimController {
	@Autowired
	private MoimService moimService;
	
	@ApiOperation(value = "")
}
