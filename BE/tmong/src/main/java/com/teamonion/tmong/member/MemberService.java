package com.teamonion.tmong.member;

import com.teamonion.tmong.exception.MemberIdOverlapException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public Member save(Member member) {
        return memberRepository.save(member);
    }

    public Member findByMemberId(String memberId) throws MemberIdOverlapException {
        return memberRepository.findByMemberId(memberId).orElseThrow(MemberIdOverlapException::new);
    }
}
