package com.teamonion.tmong.member;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = "classpath:application.properties")
public class MemberAcceptanceTest {

    @Autowired
    TestRestTemplate template;

    @Test
    public void singUp() {
        MemberSignUpRequest memberSignUpRequest = new MemberSignUpRequest();
        String memberId = "chicken";
        memberSignUpRequest.setMemberId(memberId);
        memberSignUpRequest.setPassword("123456789a");
        memberSignUpRequest.setPasswordCheck("123456789a");

        ResponseEntity<MemberLoginResponse> response = template
                .postForEntity("/api/members", memberSignUpRequest, MemberLoginResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getMemberId()).isEqualTo(memberId);
        assertThat(response.getBody().getJwt()).isNotNull();
    }
}
