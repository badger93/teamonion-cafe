package com.teamonion.tmong.member;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teamonion.tmong.component.JwtComponent;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(MemberController.class)
public class MemberControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    MemberService memberService;

    @MockBean
    JwtComponent jwtComponent;

    @Test
    public void 회원가입() throws Exception {
        MemberSignUpRequest memberSignUpRequest = new MemberSignUpRequest();
        memberSignUpRequest.setMemberId("onion");
        memberSignUpRequest.setPassword("123456789a");
        memberSignUpRequest.setPasswordCheck("123456789a");

        Member member = memberSignUpRequest.toEntity();

        Mockito.when(memberService.save(memberSignUpRequest))
                .thenReturn(new MemberLoginResponse(member, null));

        mockMvc.perform(post("/api/members")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(memberSignUpRequest)))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void 아이디_중복체크() throws Exception {
        String memberId = "onion";

        Mockito.when(memberService.isOverlap(memberId)).thenReturn(false);

        mockMvc.perform(get("/api/members/overlap")
                .param("memberId", memberId))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("false"));
    }

    @Test
    public void 로그인() throws Exception {
        MemberLoginRequest memberLoginRequest = new MemberLoginRequest();
        memberLoginRequest.setMemberId("onion");
        memberLoginRequest.setPassword("123456789a");

        mockMvc.perform(post("/api/members/login")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(memberLoginRequest))
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());
    }

}