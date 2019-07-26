package com.teamonion.tmong.member;

import com.teamonion.tmong.security.CheckJwt;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<MemberLoginResponse> signUp(@RequestBody @Valid MemberSignUpRequest memberSignUpRequest) {
        return new ResponseEntity<>(memberService.save(memberSignUpRequest), HttpStatus.CREATED);
    }

    @GetMapping("/overlap")
    public ResponseEntity<Boolean> overlapCheck(String memberId) {
        return new ResponseEntity<>(memberService.isOverlap(memberId), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponse> login(@RequestBody @Valid MemberLoginRequest memberLoginRequest) {
        return new ResponseEntity<>(memberService.login(memberLoginRequest), HttpStatus.OK);
    }

    @CheckJwt
    @GetMapping
    public ResponseEntity<Page<Member>> getMembers(Pageable pageable) {
        return new ResponseEntity<>(memberService.getMembers(pageable), HttpStatus.OK);
    }

    @CheckJwt
    @GetMapping("/{memberId}")
    public ResponseEntity<Page<Member>> search(Pageable pageable, @PathVariable String memberId) {
        return new ResponseEntity<>(memberService.search(pageable, memberId), HttpStatus.OK);
    }

    @CheckJwt
    @GetMapping("/{id}/point")
    public ResponseEntity getPoint(@PathVariable Long id) {
        return new ResponseEntity(memberService.getPoint(id), HttpStatus.OK);
    }

    @CheckJwt
    @PutMapping("/{id}/point")
    public ResponseEntity pointUpdate(@PathVariable Long id, @RequestBody long point) {
        memberService.pointUpdate(id, point);
        return new ResponseEntity(HttpStatus.OK);
    }

}
