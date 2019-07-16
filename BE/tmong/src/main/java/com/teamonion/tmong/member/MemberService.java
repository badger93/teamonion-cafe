package com.teamonion.tmong.member;

import com.teamonion.tmong.exception.MemberNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public Member save(MemberSignUpRequestDto memberSignUpRequestDto) {
        Member member = memberSignUpRequestDto.toEntity();
        return memberRepository.save(member);
    }

    public Member findByMemberId(String memberId) throws MemberNotFoundException {
        return memberRepository.findByMemberId(memberId).orElseThrow(MemberNotFoundException::new);
    }
}
