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

    private MenuAddRequest menuAddRequest;
    private MenuUpdateRequest menuUpdateRequest;
    private MockMultipartFile mockMultipartFile;

    @Before
    public void setUp() throws IOException {
        String imagePath = "src/test/resources/cat.jpg";
        mockMultipartFile = new MockMultipartFile("name", "name.jpg",
                "image/jpg", new FileInputStream(new File(imagePath)));
    }

    @Test
    public void 메뉴추가() throws Exception {
        menuAddRequest = new MenuAddRequest();
        menuAddRequest.setName("americano");
        menuAddRequest.setPrice(1000L);
        menuAddRequest.setInformation("맛있는 음료");
        menuAddRequest.setImageFile(mockMultipartFile);

        mockMvc.perform(multipart("/api/menus")
                .file("imageFile", mockMultipartFile.getBytes())
                .param("name", menuAddRequest.getName())
                .param("price", String.valueOf(menuAddRequest.getPrice()))
                .param("information", menuAddRequest.getInformation())
                .param("imageFile", String.valueOf(menuAddRequest.getImageFile()))
                .header("Authorization", "Bearer " + jwtComponent))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void 메뉴수정() throws Exception {
        menuUpdateRequest = new MenuUpdateRequest();
        menuUpdateRequest.setName("americano");
        menuUpdateRequest.setPrice(1100L);
        menuUpdateRequest.setInformation("카페인 잔뜩 ! 졸음을 내쫒는 기가막힌 음료 !");

        Long menu_id = 1L;

        mockMvc.perform(MockMvcRequestBuilders.put("/api/menus/" + menu_id)
                .param("name", menuUpdateRequest.getName())
                .param("price", String.valueOf(menuUpdateRequest.getPrice()))
                .param("information", menuUpdateRequest.getInformation())
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