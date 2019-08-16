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

/**
 * 단위 테스트는 잘 작성했는데 몇개 빈 부분도 있지만
 * DB 를 연동한 통합 테스트가 가능한 테스트 클래스를 만들어 보면 좋을 거 같아요
 * 지금은 목으로 처리하고 있지만 실제로 DB 에 접속해서 저장하고 수정하고 조회하고 삭제하는 시나리오로 테스트를 해보면 어떨까요
 */
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
        Mockito.when(memberRepository.existsByMemberId(memberId)).thenReturn(false);

        //then
        assertThat(memberService.isDuplicate(memberId)).isFalse();
    }

    @Test
    public void isOverlapTest_중복() {
        //given
        String memberId = "onion";

        //when
        Mockito.when(memberRepository.existsByMemberId(memberId)).thenReturn(true);

        //then
        assertThat(memberService.isDuplicate(memberId)).isTrue();
    }
}