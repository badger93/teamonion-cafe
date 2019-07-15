package com.teamonion.tmong.domain.member;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Setter
@Getter
@Entity
public class Member {

    @Id
    @GeneratedValue
    private Long id;

    private String memberId;

    private String password;

    private String point;
}
