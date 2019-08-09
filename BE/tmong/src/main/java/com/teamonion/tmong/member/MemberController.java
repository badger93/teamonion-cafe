package com.teamonion.tmong.member;

import com.teamonion.tmong.authorization.CheckJwt;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class MemberController {

    @NonNull
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<MemberLoginResponse> signUp(@RequestBody @Valid MemberSignUpRequest memberSignUpRequest) {
        return new ResponseEntity<>(memberService.signUp(memberSignUpRequest), HttpStatus.CREATED);
    }

    @GetMapping("/overlap")
    public ResponseEntity<Boolean> overlapCheck(String memberId) {
        return new ResponseEntity<>(memberService.isOverlap(memberId), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponse> login(@RequestBody @Valid MemberLoginRequest memberLoginRequest) {
        return new ResponseEntity<>(memberService.login(memberLoginRequest), HttpStatus.OK);
    }

    @CheckJwt(role = MemberRole.ADMIN)
    @GetMapping
    public ResponseEntity<Page<Member>> getMembers(
            @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return new ResponseEntity<>(memberService.getMembers(pageable), HttpStatus.OK);
    }

    @CheckJwt(role = MemberRole.ADMIN)
    @GetMapping("/search")
    public ResponseEntity<Page<Member>> search(Pageable pageable, @RequestParam String memberId) {
        return new ResponseEntity<>(memberService.search(pageable, memberId), HttpStatus.OK);
    }

    @CheckJwt
    @GetMapping("/{id}/point")
    public ResponseEntity<Long> getPoint(@PathVariable Long id) {
        return new ResponseEntity<>(memberService.getPoint(id), HttpStatus.OK);
    }

    @CheckJwt(role = MemberRole.ADMIN)
    @PutMapping("/{id}/point")
    public ResponseEntity pointUpdate(@PathVariable Long id, @RequestBody long point) {
        memberService.pointUpdate(id, point);
        return new ResponseEntity(HttpStatus.OK);
    }

}
