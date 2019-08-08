package com.teamonion.tmong.member;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.teamonion.tmong.security.JwtComponent;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jdk.internal.org.objectweb.asm.TypeReference;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.*;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = "classpath:application.properties")
public class MemberAcceptanceTest {

    @Autowired
    TestRestTemplate template;

    @Autowired
    ObjectMapper objectMapper;

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
    public void getMembersTest() throws IOException {
        String memberId = "chicken4";
        MemberSignUpRequest memberSignUpRequest = new MemberSignUpRequest();
        memberSignUpRequest.setMemberId(memberId);
        memberSignUpRequest.setPassword("123456789a");
        memberSignUpRequest.setPasswordCheck("123456789a");

        template.postForEntity("/api/members", memberSignUpRequest, MemberLoginResponse.class);

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



        ResponseEntity<Object> response = template.exchange(
                uriComponentsBuilder.toUriString(), HttpMethod.GET, entity, Object.class, new HashMap<>());

        System.out.println("------body : " + response.getBody());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        PageResponse pageResponse = objectMapper.convertValue(response, TypeFactory.defaultInstance().constructCollectionType(List.class, Member.class));

        String s = response.getBody().toString();
        s.replaceAll("\"","");


        objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);

        System.out.println("-----" + s);
        PageResponse pageResponse = objectMapper.readValue(
                s, PageResponse.class
        );

        System.out.println(pageResponse);
    }

}
