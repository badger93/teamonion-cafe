package com.teamonion.tmong.menu;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teamonion.tmong.security.JwtComponent;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

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

    @MockBean
    JwtComponent jwtComponent;

    private MenuSaveDto menuSaveDto;
    private MenuUpdateDto menuUpdateDto;
    private MockMultipartFile mockMultipartFile;

    @Before
    public void setUp() throws IOException {
        menuSaveDto = new MenuSaveDto();
        menuUpdateDto = new MenuUpdateDto();

        String imagePath = "src/test/resources/cat.jpg";
        mockMultipartFile = new MockMultipartFile("name", "name.jpg",
                "image/jpg", new FileInputStream(new File(imagePath)));

        menuSaveDto.setName("americano");
        menuSaveDto.setPrice(1000);
        menuSaveDto.setInformation("맛있는 음료");
        menuSaveDto.setImageFile(mockMultipartFile);

        menuUpdateDto.setName("americano");
        menuUpdateDto.setPrice(1100);
        menuUpdateDto.setInformation("카페인 잔뜩 ! 졸음을 내쫒는 기가막힌 음료 !");

    }

    @Test
    public void 메뉴추가() throws Exception {
        mockMvc.perform(multipart("/api/menus")
                .file("imageFile", mockMultipartFile.getBytes())
                .param("name", menuSaveDto.getName())
                .param("price", String.valueOf(menuSaveDto.getPrice()))
                .param("information", menuSaveDto.getInformation())
                .param("imageFile", String.valueOf(menuSaveDto.getImageFile()))
                .header("Authorization", "Bearer " + jwtComponent))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void 메뉴수정() throws Exception {
        Long menu_id = 1L;

        mockMvc.perform(MockMvcRequestBuilders.put("/api/menus/" + menu_id)
                .param("name", menuUpdateDto.getName())
                .param("price", String.valueOf(menuUpdateDto.getPrice()))
                .param("information", menuUpdateDto.getInformation())
                .header("Authorization", "Bearer " + jwtComponent))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void 전체조회() throws Exception {
        mockMvc.perform(get("/api/menus")
                .param("page", "0")
                .param("size", "20"))
                .andDo(print())
                .andExpect(status().isOk());

        //.andExpect(content().contentType("application/json")
        // java.lang.AssertionError: Content type not set
    }

    @Test
    public void 이름검색조회() throws Exception {
        String menu_name = "americano";

        mockMvc.perform(get("/api/menus/search")
                .param("menu_name", menu_name)
                .param("page", "0")
                .param("size", "10"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void 메뉴삭제() throws Exception {
        Long menu_id = 1L;

        mockMvc.perform(delete("/api/menus/" + menu_id)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .header("Authorization", "Bearer " + jwtComponent))
                .andDo(print())
                .andExpect(status().isOk());
    }

}