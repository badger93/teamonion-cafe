package com.teamonion.tmong.member;

import com.teamonion.tmong.exception.*;
import com.teamonion.tmong.authorization.JwtComponent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    @NonNull
    private final MemberRepository memberRepository;

    @NonNull
    private final JwtComponent jwtComponent;

    public MemberLoginResponse signUp(MemberSignUpRequest memberSignUpRequest) {
        if (isDuplicate(memberSignUpRequest.getMemberId())) {
            throw new ValidCustomException(ValidExceptionType.MEMBERID_OVERLAP);
        }
        Member savedMember = memberRepository.save(memberSignUpRequest.toEntity());
        return new MemberLoginResponse(savedMember, jwtComponent.createToken(savedMember));
    }

    public Page<Member> search(Pageable pageable, String memberId) {
        return memberRepository.findByMemberIdContaining(pageable, memberId);
    }

    public MemberLoginResponse login(MemberLoginRequest memberLoginRequest) {
        Member member = findByMemberId(memberLoginRequest.getMemberId());

        if (!member.match(memberLoginRequest.getPassword())) {
            throw new ValidCustomException(ValidExceptionType.PASSWORD_MISMATCH);
        }
        return new MemberLoginResponse(member, jwtComponent.createToken(member));
    }

    public boolean isDuplicate(String memberId) {
        return memberRepository.existsByMemberId(memberId);
    }

    public Page<Member> getMembers(Pageable pageable) {
        return memberRepository.findAll(pageable);
    }

    public long pointUpdate(Long id, long point) {
        Member member = findById(id);
        member.pointUpdate(point);
        return memberRepository.save(member).getPoint();
    }

    public long getPoint(Long id) {
        return findById(id).getPoint();
    }

    public Member findById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new ValidCustomException(ValidExceptionType.MEMBER_NOT_FOUND));
    }

    public Member findByMemberId(String memberId) {
        return memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new ValidCustomException(ValidExceptionType.MEMBER_NOT_FOUND));
    }

}
