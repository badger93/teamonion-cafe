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
}