package com.teamonion.tmong.member;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class MemberController {
    private static Logger log = LoggerFactory.getLogger(MemberController.class);

    @NonNull
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity signUp(@RequestBody @Valid MemberSignUpRequest memberSignUpRequest) {
        memberService.save(memberSignUpRequest);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/overlap")
    public ResponseEntity<Boolean> overlapCheck(String memberId) {
        return new ResponseEntity<>(memberService.isOverlap(memberId), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponse> login(@RequestBody @Valid MemberLoginRequest memberLoginRequest) {
        return new ResponseEntity<>(memberService.login(memberLoginRequest), HttpStatus.OK);
    }
}
