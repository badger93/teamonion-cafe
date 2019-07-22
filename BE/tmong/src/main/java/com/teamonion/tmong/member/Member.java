package com.teamonion.tmong.member;

import lombok.*;

import javax.persistence.*;

@Getter
@EqualsAndHashCode(of = "id")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String memberId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberRole memberRole = MemberRole.NORMAL;

    @Column(nullable = false)
    private String point;

    @Builder
    public Member(String memberId, String password) {
        this.memberId = memberId;
        this.password = password;
        this.point = "0";
    }

    public boolean match(String password) {
        return this.password.equals(password);
    }

    public void pointUpdate(String point) {
        this.point = point;
    }
}

