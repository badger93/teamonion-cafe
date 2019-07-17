package com.teamonion.tmong.member;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teamonion.tmong.exception.MemberNotFoundException;
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

    @Test
    public void 회원가입_성공() throws Exception {
        MemberSignUpRequestDto memberSignUpRequestDto = new MemberSignUpRequestDto();
        memberSignUpRequestDto.setMemberId("onion");
        memberSignUpRequestDto.setPassword("123456789a");
        memberSignUpRequestDto.setPasswordCheck("123456789a");

        Mockito.when(memberService.save(memberSignUpRequestDto))
                .thenReturn(memberSignUpRequestDto.toEntity());

        mockMvc.perform(post("/api/members")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(memberSignUpRequestDto))
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void 아이디_중복체크_중복아님() throws Exception {
        String memberId = "onion";

        Mockito.when(memberService.findByMemberId(memberId)).thenThrow(new MemberNotFoundException());

        mockMvc.perform(get("/api/members/overlap")
                .param("memberId", memberId))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("false"));
    }

    @Test
    public void 아이디_중복체크_중복됨() throws Exception {
        String memberId = "onion";

        Member member = Member.builder()
                .memberId(memberId)
                .password("pass")
                .build();

        Mockito.when(memberService.findByMemberId(memberId)).thenReturn(member);

        mockMvc.perform(get("/api/members/overlap")
                .param("memberId", memberId))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    public void 로그인_성공() throws Exception {
        MemberLoginRequestDto memberLoginRequestDto = new MemberLoginRequestDto();
        memberLoginRequestDto.setMemberId("onion");
        memberLoginRequestDto.setPassword("123456789a");

        mockMvc.perform(post("/api/members/login")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(memberLoginRequestDto))
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());
    }
}