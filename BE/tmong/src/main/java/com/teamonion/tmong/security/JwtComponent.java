package com.teamonion.tmong.security;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
import com.teamonion.tmong.member.Member;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtComponent {
    private static final Logger log = LoggerFactory.getLogger(JwtComponent.class);
    private Long tokenExpirationTimeMillis = 1000 * 60 * 60 * 24L;
    private String secret = "secret";
    public static final String MEMBER_ID = "memberId";
    public static final String ROLE = "role";


    public String createToken(Member member) {
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("alg", "HS256")
                .claim(MEMBER_ID, member.getMemberId())
                .claim(ROLE, member.getMemberRole())
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
            log.debug("jwt is invalid : {}", e.getMessage());
            throw new HandleRuntimeException(GlobalExceptionType.UNAUTHORIZED);
        }
    }

    public String getClaimValueByToken(String claimName) {
        Optional<HttpServletRequest> request = Optional
                .ofNullable(((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest());
        String authorization = request.orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.REQUEST_IS_NULL))
                .getHeader("Authorization");
        String jwt = authorization.substring("Bearer".length()).trim();

        return (String) Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(jwt)
                .getBody()
                .get(claimName);
    }
}
