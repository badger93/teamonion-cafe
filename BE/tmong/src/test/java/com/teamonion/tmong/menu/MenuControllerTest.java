package com.teamonion.tmong.menu;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(MenuController.class)
public class MenuControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    MenuService menuService;

    @Test
    public void add() throws Exception {
        Menu menu = Menu.builder()
                .name("americano")
                .price("1000")
                .information("직장인의 기본 음료")
                .imagePath("http://localhost:8080/example")
                .build();

        Mockito.when(menuService.add(menu)).thenReturn(menu);

        mockMvc.perform(post("/api/menus")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(menu)))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void selectAll() throws Exception {
        List<Menu> allMenus = new ArrayList<Menu>();

        Mockito.when(menuService.selectAll()).thenReturn(allMenus);

        mockMvc.perform(get("/api/menus")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(allMenus))
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());

    }

}