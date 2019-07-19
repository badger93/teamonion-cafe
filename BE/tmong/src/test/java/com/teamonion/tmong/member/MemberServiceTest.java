package com.teamonion.tmong.member;

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
    public void 로그인테스트() {
        // 아직..
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