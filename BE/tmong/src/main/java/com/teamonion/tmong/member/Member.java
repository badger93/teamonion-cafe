package com.teamonion.tmong.member;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@EqualsAndHashCode(of = "id")
public class Member {

    @Id
    @GeneratedValue
    private Long id;

    private String memberId;

    private String password;

    @Enumerated(EnumType.STRING)
    private MemberRole memberRole;

    private String point;
}
