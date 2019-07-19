package com.teamonion.tmong.component;

import com.teamonion.tmong.exception.UnauthorizedException;
import com.teamonion.tmong.member.Member;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtComponent {
    private static final Logger log = LoggerFactory.getLogger(JwtComponent.class);

    private Long tokenExpirationTimeMillis = 1000 * 60 * 60 * 24L;

    private String secret = "secret";

    public String createToken(Member member) {
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("alg", "HS256")
                .claim("memberId", member.getMemberId())
                .claim("role", member.getMemberRole())
                .setExpiration(new Date(System.currentTimeMillis() + tokenExpirationTimeMillis))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public void checkToken(String jwt) {
        try {
            Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(jwt);
        } catch (JwtException e) {
            log.info("jwt is invalid : {}", e.getMessage());
            throw new UnauthorizedException();
        }
    }
}
