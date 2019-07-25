package com.teamonion.tmong.member;

import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class MemberTest {

    private Member member;

    @Before
    public void setUp() {
        member = Member.builder()
                .memberId("onion")
                .password("123456789a")
                .build();
    }

    @Test
    public void match_password() {
        String password = "123456789a";

        assertThat(member.match(password)).isTrue();
    }

    @Test
    public void pointUpdateTest() {
        long point = 1234;

        member.pointUpdate(point);
        assertThat(member.getPoint()).isEqualTo(point);
    }
}