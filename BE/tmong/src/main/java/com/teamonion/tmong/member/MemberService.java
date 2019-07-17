package com.teamonion.tmong.member;

import com.teamonion.tmong.exception.MemberNotFoundException;
import com.teamonion.tmong.exception.PasswordMismatchException;
import com.teamonion.tmong.exception.ValidCustomException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    private static final Logger log = LoggerFactory.getLogger(MemberService.class);

    @Autowired
    private MemberRepository memberRepository;

    public Member save(MemberSignUpRequestDto memberSignUpRequestDto) {
        if(isOverlap(memberSignUpRequestDto.getMemberId())) {
            throw new ValidCustomException("memberId", "이미 사용중인 아이디입니다");
        }
        return memberRepository.save(memberSignUpRequestDto.toEntity());
    }

    public Member findByMemberId(String memberId) {
        return memberRepository.findByMemberId(memberId).orElseThrow(MemberNotFoundException::new);
    }

    public void login(MemberLoginRequestDto memberLoginRequestDto) {
        Member member = findByMemberId(memberLoginRequestDto.getMemberId());

        if(!member.match(memberLoginRequestDto.getPassword())){
            throw new PasswordMismatchException();
        }
    }

    public boolean isOverlap(String memberId) {
        if(memberRepository.findByMemberId(memberId).isPresent()) {
            return true;
        }
        return false;
    }
}
