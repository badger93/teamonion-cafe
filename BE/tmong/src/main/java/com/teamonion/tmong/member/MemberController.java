package com.teamonion.tmong.member;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/members")
@RestController
public class MemberController {
    private static Logger log = LoggerFactory.getLogger(MemberController.class);

    @Autowired
    private MemberService memberService;

    @PostMapping
    public ResponseEntity signUp(@RequestBody @Valid MemberSignUpRequestDto memberSignUpRequestDto) {
        memberService.save(memberSignUpRequestDto);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/overlap")
    public ResponseEntity overlapCheck(String memberId) {
        return new ResponseEntity(memberService.isOverlap(memberId), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid MemberLoginRequestDto memberLoginRequestDto) {
        return new ResponseEntity(memberService.login(memberLoginRequestDto), HttpStatus.OK);
    }
}
