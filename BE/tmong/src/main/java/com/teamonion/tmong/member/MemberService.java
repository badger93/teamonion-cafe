package com.teamonion.tmong.member;

import com.teamonion.tmong.exception.MemberNotFoundException;
import com.teamonion.tmong.exception.PasswordCheckNotValidException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public Member save(MemberSignUpRequestDto memberSignUpRequestDto) throws PasswordCheckNotValidException {
        Member member = memberSignUpRequestDto.toEntity();
        return memberRepository.save(member);
    }

    public Member findByMemberId(String memberId) throws MemberNotFoundException {
        return memberRepository.findByMemberId(memberId).orElseThrow(MemberNotFoundException::new);
    }

    public void login(MemberLoginRequestDto memberLoginRequestDto) throws MemberNotFoundException {
        Member member = memberRepository.findByMemberId(memberLoginRequestDto.getMemberId())
                .orElseThrow(MemberNotFoundException::new);

        if(!member.match(memberLoginRequestDto.getPassword())){
            //TODO : 에러 던져서 처리해주기..
        }
    }
}
