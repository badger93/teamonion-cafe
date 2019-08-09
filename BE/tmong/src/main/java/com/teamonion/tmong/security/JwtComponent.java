package com.teamonion.tmong.security;

import com.google.common.net.HttpHeaders;
import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.GlobalException;
import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.member.MemberRole;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Date;
import java.util.Optional;

@Component
public class JwtComponent {
    private static final Logger log = LoggerFactory.getLogger(JwtComponent.class);
    private static final String AUTHORIZATION_TYPE = "Bearer";
    private static long TOKEN_EXPIRATION_TIME_MILLIS = 1000 * 60 * 60 * 24L;
    private static String SECRET_KEY = "secret";
    public static final String MEMBER_ID = "memberId";
    public static final String ROLE = "role";


    public String createToken(Member member) {
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("alg", "HS256")
                .claim(MEMBER_ID, member.getMemberId())
                .claim(ROLE, member.getMemberRole())
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_TIME_MILLIS))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public void checkValidToken(String jwt) {
        try {
            Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(jwt);
        } catch (JwtException e) {
            log.debug("JWT is invalid : {}", e.getMessage());
            throw new GlobalException(GlobalExceptionType.UNAUTHORIZED);
        }
    }

    public void checkAdmin() {
        if (!getClaimValueByToken(ROLE).equals(MemberRole.ADMIN.toString())) {
            log.debug("checkAdmin fail.. this MemberRole : {}", getClaimValueByToken(ROLE));
            throw new GlobalException(GlobalExceptionType.UNAUTHORIZED);
        }
        log.debug("Hello Admin");
    }

    public String getClaimValueByToken(String claimName) {
        String authorization = Optional.ofNullable(
                ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest()
        )
                .orElseThrow(() -> new GlobalException(GlobalExceptionType.REQUEST_IS_NULL))
                .getHeader(HttpHeaders.AUTHORIZATION);

        String jwt = authorization.substring(AUTHORIZATION_TYPE.length()).trim();

        return (String) Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(jwt)
                .getBody()
                .get(claimName);
    }

    public String getClaimValueByTokenForWebSocket(String jwt, String claimName) {
        return (String) Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(jwt)
                .getBody()
                .get(claimName);
    }

    public void checkAdminForWebSocket(String jwt) {
        if (!getClaimValueByTokenForWebSocket(jwt, ROLE).equals(MemberRole.ADMIN.toString())) {
            log.debug("checkAdmin fail.. this MemberRole : {}", getClaimValueByTokenForWebSocket(jwt, ROLE));
            throw new GlobalException(GlobalExceptionType.UNAUTHORIZED);
        }
    }


}
