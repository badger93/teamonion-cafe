package com.teamonion.tmong.member;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@Builder
@Entity
@EqualsAndHashCode(of = "id")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String memberId;

    private String password;

    @Enumerated(EnumType.STRING)
    private MemberRole memberRole = MemberRole.NORMAL;

    private String point;

    public Member() {
        this.point = new String();
        this.point = "0";
    }
}
