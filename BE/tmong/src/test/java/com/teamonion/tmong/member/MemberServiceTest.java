package com.teamonion.tmong.member;

import com.teamonion.tmong.authorization.JwtComponent;
import org.junit.Before;
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

    private Member member;

    @Before
    public void setUp() {
        member = Member.builder()
                .memberId("onion")
                .password("123456789a")
                .build();
    }

    @Test
    public void saveTest() {
        //given
        MemberSignUpRequest memberSignUpRequest = new MemberSignUpRequest();
        memberSignUpRequest.setMemberId(member.getMemberId());
        memberSignUpRequest.setPassword(member.getPassword());
        memberSignUpRequest.setPasswordCheck(member.getPassword());

        //when
        Mockito.when(memberRepository.save(member)).thenReturn(member);
        Mockito.when(jwtComponent.createToken(member)).thenReturn(null);

        //then
        assertThat(memberService.signUp(memberSignUpRequest).getMemberId()).isEqualTo(member.getMemberId());
    }

    @Test
    public void 로그인테스트_성공() {
        //given
        MemberLoginRequest memberLoginRequest = new MemberLoginRequest();
        memberLoginRequest.setMemberId(member.getMemberId());
        memberLoginRequest.setPassword(member.getPassword());

        //when
        Mockito.when(memberRepository.findByMemberId(member.getMemberId())).thenReturn(Optional.of(member));
        Mockito.when(jwtComponent.createToken(member)).thenReturn(null);

        //then
        assertThat(memberService.login(memberLoginRequest).getMemberId()).isEqualTo(member.getMemberId());
    }

    @Test
    public void isOverlapTest_중복아님() {
        //given
        String memberId = "pizza";

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
        Mockito.when(memberRepository.findByMemberId(memberId)).thenReturn(Optional.of(member));

        //then
        assertThat(memberService.isOverlap(memberId)).isTrue();
    }
}