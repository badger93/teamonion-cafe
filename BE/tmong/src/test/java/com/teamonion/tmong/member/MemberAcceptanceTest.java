package com.teamonion.tmong.member;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = "classpath:application.properties")
public class MemberAcceptanceTest {

    @Autowired
    TestRestTemplate template;

    @Test
    public void singUpTest_성공() {
        String memberId = "chicken";
        MemberSignUpRequest memberSignUpRequest = new MemberSignUpRequest();
        memberSignUpRequest.setMemberId(memberId);
        memberSignUpRequest.setPassword("123456789a");
        memberSignUpRequest.setPasswordCheck("123456789a");

        ResponseEntity<MemberLoginResponse> response = template
                .postForEntity("/api/members", memberSignUpRequest, MemberLoginResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getMemberId()).isEqualTo(memberId);
        assertThat(response.getBody().getJwt()).isNotNull();
    }

    @Test
    public void overlapCheckTest() {
        String memberId = "chicken2";
        MemberSignUpRequest memberSignUpRequest = new MemberSignUpRequest();
        memberSignUpRequest.setMemberId(memberId);
        memberSignUpRequest.setPassword("123456789a");
        memberSignUpRequest.setPasswordCheck("123456789a");

        template.postForEntity("/api/members", memberSignUpRequest, MemberLoginResponse.class);

        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromUriString("/api/members/overlap")
                .queryParam("memberId", memberId);
        ResponseEntity<Boolean> response = template
                .getForEntity(uriComponentsBuilder.toUriString(), Boolean.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isTrue();
    }

    @Test
    public void loginTest() {
        String memberId = "chicken3";
        MemberSignUpRequest memberSignUpRequest = new MemberSignUpRequest();
        memberSignUpRequest.setMemberId(memberId);
        memberSignUpRequest.setPassword("123456789a");
        memberSignUpRequest.setPasswordCheck("123456789a");

        MemberLoginRequest memberLoginRequest = new MemberLoginRequest();
        memberLoginRequest.setMemberId(memberId);
        memberLoginRequest.setPassword("123456789a");

        template.postForEntity("/api/members", memberSignUpRequest, MemberLoginResponse.class);

        ResponseEntity<MemberLoginResponse> response = template
                .postForEntity("/api/members/login", memberLoginRequest, MemberLoginResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getMemberId()).isEqualTo(memberId);
        assertThat(response.getBody().getJwt()).isNotNull();
    }

    @Test
    public void getMembers_헤더에_admin_jwt_주면_성공() {
//        String memberId = "chicken4";
//        MemberSignUpRequest memberSignUpRequest = new MemberSignUpRequest();
//        memberSignUpRequest.setMemberId(memberId);
//        memberSignUpRequest.setPassword("123456789a");
//        memberSignUpRequest.setPasswordCheck("123456789a");
//
//        template.postForEntity("/api/members", memberSignUpRequest, MemberLoginResponse.class);

        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromUriString("/api/members");

        String jwt = Jwts.builder()
                    .setHeaderParam("typ", "JWT")
                    .setHeaderParam("alg", "HS256")
                    .claim("memberId", "admin")
                    .claim("role", MemberRole.ADMIN)
                    .signWith(SignatureAlgorithm.HS256, "secret")
                    .compact();

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + jwt);
        HttpEntity entity = new HttpEntity(headers);

        ResponseEntity<Map> response = template.exchange(
                uriComponentsBuilder.toUriString(), HttpMethod.GET, entity, Map.class, new HashMap<>());

        assertThat(response.getBody().get("content")).isNotNull();
    }

}
