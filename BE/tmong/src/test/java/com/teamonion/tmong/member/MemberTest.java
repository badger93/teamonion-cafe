package com.teamonion.tmong.member;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class MemberTest {

    @Test
    public void builder() {
        Member member = Member.builder()
                .memberId("onion")
                .password("pass")
                .memberRole(MemberRole.NORMAL)
                .build();

        assertThat(member).isNotNull();
    }

    @Test
    public void javaBean() {
        Member member = new Member();
        member.setMemberId("onion");
        member.setPassword("pass");

        assertThat(member.getMemberId()).isEqualTo("onion");
    }
}