package com.teamonion.tmong.member;

import com.teamonion.tmong.exception.MemberNotFoundException;
import com.teamonion.tmong.exception.PasswordCheckNotValidException;
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
    public ResponseEntity signUp(@RequestBody @Valid MemberSignUpRequestDto memberSignUpRequestDto) throws PasswordCheckNotValidException {
        Member savedMember = memberService.save(memberSignUpRequestDto);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/overlap")
    public ResponseEntity overlapCheck(String memberId) {
        boolean overlap = true;
        try {
            memberService.findByMemberId(memberId);
            log.info("MemberId({}) Overlap.", memberId);
        } catch (MemberNotFoundException e) {
            overlap = false;
            log.info("not overlap");
        }
        return new ResponseEntity(overlap, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid MemberLoginRequestDto memberLoginRequestDto) {
        try {
            memberService.login(memberLoginRequestDto);
        } catch (MemberNotFoundException e) {
            //TODO : error message 보내주기
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
