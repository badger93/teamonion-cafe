package com.teamonion.tmong.member;

import com.teamonion.tmong.exception.MemberIdOverlapException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RequestMapping("/api/members")
@RestController
public class MemberController {

    private static Logger logger = LoggerFactory.getLogger(MemberController.class);

    @Autowired
    private MemberService memberService;

    @PostMapping
    public ResponseEntity signUp(@RequestBody Member member) {
        //TODO : dto 사용해서 valid
        Member savedMember = memberService.save(member);
        return new ResponseEntity(HttpStatus.CREATED);
    }
    
    @GetMapping("/overlap")
    public ResponseEntity overlapCheck(String memberId) {
        boolean overlap = false;
        try {
            memberService.findByMemberId(memberId);
        }catch (MemberIdOverlapException e){
            logger.info("MemberId({}) Overlap.", memberId);
            overlap = true;
        }
        return new ResponseEntity(overlap, HttpStatus.OK);
    }
}
