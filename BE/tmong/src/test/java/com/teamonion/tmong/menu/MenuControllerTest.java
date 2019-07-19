package com.teamonion.tmong.menu;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
    public void 메뉴_추가() throws Exception {
        // TODO : 목 이미지 파일 생성
        MockMultipartFile testmultipartFile = new MockMultipartFile("image", new byte[1]);
                //new MockMultipartFile("file","testfile", "multipart/form-data", "test data".getBytes());
        MenuAddDto menuAddDto = new MenuAddDto("americano", "1000", "직장인의 인기 메뉴", testmultipartFile);

        Mockito.when(menuService.add(menuAddDto)).thenReturn(menuAddDto.toEntity());

        mockMvc.perform(post("/api/menus")
                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void 메뉴_전체조회() throws Exception {
        List<Menu> allMenus = new ArrayList<Menu>();

        Mockito.when(menuService.selectAll()).thenReturn(allMenus);

        mockMvc.perform(get("/api/menus")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(allMenus))
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void 메뉴_삭제() throws Exception {
        Long menu_id = 1L;

        mockMvc.perform(delete("/api/menus/{id}", menu_id)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(menu_id))
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());
    }

}