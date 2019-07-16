package com.teamonion.tmong.member;

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
    private MemberRepository memberRepository;

    @PostMapping
    public ResponseEntity signUp(@RequestBody Member member) {
        Member savedMember = memberRepository.save(member);
        logger.info("Member : {}", savedMember.getPoint());
        return new ResponseEntity(HttpStatus.CREATED);
    }
}
