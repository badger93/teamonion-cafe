package com.teamonion.tmong.member;

import lombok.Getter;

@Getter
public class MemberLoginResponse {
    private String point;
    private String jwt;

    public MemberLoginResponse(String point, String jwt){
        this.point = point;
        this.jwt = jwt;
    }
}
