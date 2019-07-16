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
    public void signUp() throws Exception {
        Member member = Member.builder()
                .memberId("onion")
                .password("pass")
                .build();

        Mockito.when(memberService.save(member)).thenReturn(member);

        mockMvc.perform(post("/api/members")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(member))
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void overlapCheck_중복아님() throws Exception {
        String memberId = "onion";

        Mockito.when(memberService.findByMemberId(memberId)).thenThrow(new MemberNotFoundException());

        mockMvc.perform(get("/api/members/overlap")
                .param("memberId", memberId))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("false"));
    }

    @Test
    public void overlapCheck_중복됨() throws Exception {
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
}