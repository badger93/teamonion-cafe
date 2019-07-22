package com.teamonion.tmong.member;

import com.teamonion.tmong.component.JwtComponent;
import com.teamonion.tmong.exception.ValidCustomException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class MemberServiceTest {

    @Mock
    MemberRepository memberRepository;

    @Mock
    JwtComponent jwtComponent;

    @InjectMocks
    MemberService memberService;

    @Test
    public void saveTest() {
        //given
        MemberSignUpRequest memberSignUpRequest = new MemberSignUpRequest();
        memberSignUpRequest.setMemberId("onion");
        memberSignUpRequest.setPassword("123456789a");
        memberSignUpRequest.setPasswordCheck("123456789a");

        Member member = memberSignUpRequest.toEntity();

        //when
        Mockito.when(memberRepository.save(member)).thenReturn(member);

        //then
        assertThat(memberService.save(memberSignUpRequest)).isEqualTo(member);
    }

    @Test
    public void 로그인테스트_성공() {
        //given
        String memberId = "onion";
        String password = "123456789a";
        MemberLoginRequest memberLoginRequest = new MemberLoginRequest();
        memberLoginRequest.setMemberId(memberId);
        memberLoginRequest.setPassword(password);
        Member member = Member.builder()
                .memberId(memberId)
                .password(password)
                .build();

        //when
        Mockito.when(memberRepository.findByMemberId(memberId)).thenReturn(Optional.of(member));
        Mockito.when(jwtComponent.createToken(member)).thenReturn(null);

        //then
        assertThat(memberService.login(memberLoginRequest).getPoint()).isEqualTo(member.getPoint());
        assertThat(memberService.login(memberLoginRequest).getJwt()).isEqualTo(jwtComponent.createToken(member));
    }

    @Test(expected = ValidCustomException.class)
    public void 로그인테스트_없는아이디() {
        //given
        String memberId = "onion";
        String password = "123456789a";
        MemberLoginRequest memberLoginRequest = new MemberLoginRequest();
        memberLoginRequest.setMemberId(memberId);
        memberLoginRequest.setPassword(password);
        Member member = Member.builder()
                .memberId(memberId)
                .password(password)
                .build();

        //when
        Mockito.when(memberRepository.findByMemberId(memberId)).thenReturn(Optional.empty());
    }

    @Test
    public void isOverlapTest_중복아님() {
        //given
        String memberId = "onion";

        //when
        Mockito.when(memberRepository.findByMemberId(memberId)).thenReturn(Optional.empty());

        //then
        assertThat(memberService.isOverlap(memberId)).isFalse();
    }

    @Test
    public void isOverlapTest_중복() {
        //given
        String memberId = "onion";

        //when
        Mockito.when(memberRepository.findByMemberId(memberId))
                .thenReturn(Optional.of(Member.builder()
                        .memberId(memberId)
                        .password("123456789a")
                        .build()));

        //then
        assertThat(memberService.isOverlap(memberId)).isTrue();
    }
}