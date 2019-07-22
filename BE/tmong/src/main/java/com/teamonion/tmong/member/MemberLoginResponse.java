package com.teamonion.tmong.member;

import lombok.Getter;

@Getter
public class MemberLoginResponse {
    private Long id;
    private String memberId;
    private MemberRole memberRole;
    private String point;
    private String jwt;

    public MemberLoginResponse(Member member, String jwt){
        this.id = member.getId();
        this.memberId = member.getMemberId();
        this.memberRole = member.getMemberRole();
        this.point = member.getPoint();
        this.jwt = jwt;
    }
}
