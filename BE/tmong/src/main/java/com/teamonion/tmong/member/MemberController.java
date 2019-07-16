package com.teamonion.tmong.member;

import com.teamonion.tmong.exception.MemberNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/members")
@RestController
public class MemberController {

    private static Logger logger = LoggerFactory.getLogger(MemberController.class);

    @Autowired
    private MemberService memberService;

    @PostMapping
    public ResponseEntity signUp(@RequestBody MemberSignUpRequestDto memberSignUpRequestDto) {
        //TODO : dto 사용해서 valid
        Member savedMember = memberService.save(memberSignUpRequestDto);
        return new ResponseEntity(HttpStatus.CREATED);
    }
    
    @GetMapping("/overlap")
    public ResponseEntity overlapCheck(String memberId) {
        boolean overlap = true;
        try {
            memberService.findByMemberId(memberId);
            logger.info("MemberId({}) Overlap.", memberId);
        }catch (MemberNotFoundException e){
            overlap = false;
            logger.info("not overlap");
        }
        return new ResponseEntity(overlap, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Member member ) {
        return null;
    }
}
