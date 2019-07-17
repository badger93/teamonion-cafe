package com.teamonion.tmong.member;

import com.teamonion.tmong.exception.PasswordMismatchException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class MemberServiceTest {

    @Mock
    MemberRepository memberRepository;

    @InjectMocks
    MemberService memberService;

    @Test
    public void saveTest() throws PasswordMismatchException {
        //given
        MemberSignUpRequestDto memberSignUpRequestDto = new MemberSignUpRequestDto();
        memberSignUpRequestDto.setMemberId("onion");
        memberSignUpRequestDto.setPassword("123456789a");
        memberSignUpRequestDto.setPasswordCheck("123456789a");

        Member member = memberSignUpRequestDto.toEntity();

        //when
        Mockito.when(memberRepository.save(member)).thenReturn(member);

        //then
        assertThat(memberService.save(memberSignUpRequestDto)).isEqualTo(member);
    }

    @Test
    public void 로그인테스트() {
        // 아직..
    }
}