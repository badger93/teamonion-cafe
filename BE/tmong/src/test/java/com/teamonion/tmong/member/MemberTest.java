package com.teamonion.tmong.member;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class MemberTest {

    @Test
    public void builder() {
        Member member = Member.builder()
                .memberId("onion")
                .password("pass")
                .build();

        assertThat(member).isNotNull();
    }

    @Test
    public void match_password() {
        String password = "pass";

        Member member = Member.builder()
                .memberId("onion")
                .password(password)
                .build();

        assertThat(member.match(password)).isTrue();
    }
}