package com.teamonion.tmong.menu;

import com.teamonion.tmong.member.MemberRole;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.File;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = "classpath:application.properties")
public class MenuImageProcessingTest {

    private static final Logger log = LoggerFactory.getLogger(MenuImageProcessingTest.class);

    @Autowired
    TestRestTemplate template;

    private FileSystemResource imageFile;
    private String jwt;
    private MultiValueMap<String, Object> parameters;
    private HttpHeaders headers;

    @Before
    public void setUp() {
        jwt = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("alg", "HS256")
                .claim("memberId", "admin")
                .claim("role", MemberRole.ADMIN)
                .signWith(SignatureAlgorithm.HS256, "secret")
                .compact();

        String name = "americano";
        long price = 1000L;
        String information = "delicious menu";

        parameters = new LinkedMultiValueMap<>();
        parameters.add("name", name);
        parameters.add("price", price);
        parameters.add("information", information);

        headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + jwt);
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
    }

    @Test
    public void 메뉴추가_이미지파일저장성공() {
        imageFile = new FileSystemResource(new File("src/test/resources/cat.jpg"));
        parameters.add("imageFile", imageFile);

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + jwt);
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity entity = new HttpEntity<>(parameters, headers);
        ResponseEntity<Long> responseEntity = template.exchange("/api/menus", HttpMethod.POST, entity, Long.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertNotNull(responseEntity.getBody());
    }

    @Test
    public void 메뉴수정_이미지수정() {
        String menu_id = "11";

        imageFile = new FileSystemResource(new File("src/test/resources/dog.jpg"));
        parameters.add("imageFile", imageFile);

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + jwt);
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity entity = new HttpEntity<>(parameters, headers);
        ResponseEntity responseEntity = template.exchange("/api/menus/" + menu_id, HttpMethod.PUT, entity, (Class<Object>) null);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        log.info("responseEntity : .. {}" ,responseEntity.getBody()); // .. null

    }

    @Test
    public void 메뉴삭제_이미지삭제() {
        String menu_id = "11";

        HttpEntity entity = new HttpEntity<>(parameters, headers);

        ResponseEntity responseEntity = template.exchange("/api/menus/" + menu_id, HttpMethod.DELETE, entity, (Class<Object>) null);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
