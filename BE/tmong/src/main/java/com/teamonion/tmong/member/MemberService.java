package com.teamonion.tmong.member;

import com.teamonion.tmong.component.JwtComponent;
import com.teamonion.tmong.exception.ValidExceptionType;
import com.teamonion.tmong.exception.ValidCustomException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {
    private static final Logger log = LoggerFactory.getLogger(MemberService.class);

    @NonNull
    private final MemberRepository memberRepository;

    @NonNull
    private final JwtComponent jwtComponent;

    public Member save(MemberSignUpRequest memberSignUpRequest) {
        if(isOverlap(memberSignUpRequest.getMemberId())) {
            throw new ValidCustomException(ValidExceptionType.MEMBERID_OVERLAP);
        }
        return memberRepository.save(memberSignUpRequest.toEntity());
    }

    public Member findByMemberId(String memberId) {
        return memberRepository.findByMemberId(memberId).orElseThrow(() -> new ValidCustomException(ValidExceptionType.MEMBER_NOT_FOUND));
    }

    public MemberLoginResponse login(MemberLoginRequest memberLoginRequest) {
        Member member = findByMemberId(memberLoginRequest.getMemberId());

        if(!member.match(memberLoginRequest.getPassword())){
            throw new ValidCustomException(ValidExceptionType.PASSWORD_MISMATCH);
        }
        return new MemberLoginResponse(member.getPoint(), jwtComponent.createToken(member));
    }

    public boolean isOverlap(String memberId) {
        return memberRepository.findByMemberId(memberId).isPresent();
    }
}
