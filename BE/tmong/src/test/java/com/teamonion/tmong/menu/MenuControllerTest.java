package com.teamonion.tmong.menu;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@WebMvcTest(MenuController.class)
public class MenuControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    MenuService menuService;

//    @Test
//    public void 메뉴_추가() throws Exception {
//        MultipartFile mockMultipartFile = new MockMultipartFile("example", "example.jpg", "application/form-data",
//                new FileInputStream(new File("src/main/resources/menuImage/example/example.jpg")));
//
//        MenuSaveDto menuSaveDto = new MenuSaveDto("americano", 1000, "직장인의 인기 메뉴", mockMultipartFile);
//
//        Mockito.when(menuService.add(menuSaveDto)).thenReturn(1L);
//
//        mockMvc.perform(post("/api/menus")
//                .param("name", "americano")
//                .param("price", "1000")
//                .param("information", "직장인의 인기 메뉴")
//                .contentType(MediaType.APPLICATION_JSON_UTF8))
//                .andDo(print())
//                .andExpect(status().isCreated());
//    }
//
//    @Test
//    public void 메뉴_전체조회() throws Exception {
//        List<Menu> allMenus = new ArrayList<>();
//
//        //Mockito.when(menuService.selectAll()).thenReturn(allMenus);
//
//        mockMvc.perform(get("/api/menus")
//                .contentType(MediaType.APPLICATION_JSON_UTF8)
//                .content(objectMapper.writeValueAsString(allMenus))
//                .accept(MediaType.APPLICATION_JSON_UTF8))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    public void 메뉴_삭제() throws Exception {
//        Long menu_id = 1L;
//
//        mockMvc.perform(delete("/api/menus/{menu_id}", menu_id)
//                .contentType(MediaType.APPLICATION_JSON_UTF8)
//                .content(objectMapper.writeValueAsString(menu_id))
//                .accept(MediaType.APPLICATION_JSON_UTF8))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    public void 메뉴_수정() throws Exception {
//        Long menu_id = 1L;
//
//        mockMvc.perform(put("/api/menus/{menu_id}", menu_id)
//                .param("name", "americano")
//                .param("price", "1000")
//                .param("information", "직장인의 인기 메뉴")
//                .contentType(MediaType.APPLICATION_JSON_UTF8))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    public void 메뉴_검색() throws Exception {
//        String name = "americano";
//
//        mockMvc.perform(get("/api/menus/{menu_name}", name)
//                .contentType(MediaType.APPLICATION_JSON_UTF8)
//                .accept(MediaType.APPLICATION_JSON_UTF8))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }

}