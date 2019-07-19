package com.teamonion.tmong.component;

import com.teamonion.tmong.member.Member;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtComponent {

    private Long tokenExpirationTimeMillis = 1000 * 60 * 60 * 24L;

    private String secret = "secret";

    public String createJwt(Member member) {
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("alg", "HS256")
                .claim("memberId", member.getMemberId())
                .claim("role", member.getMemberRole())
                .claim("point", member.getPoint())
                .setExpiration(new Date(System.currentTimeMillis() + tokenExpirationTimeMillis))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }
}
