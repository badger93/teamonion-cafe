package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.MenuNotFoundException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doThrow;

@RunWith(MockitoJUnitRunner.class)
public class MenuServiceTest {

    @Mock
    MenuRepository menuRepository;

    @InjectMocks
    MenuService menuService;

    private Menu menu;
    private MultipartFile mockMultipartFile;

    @Before
    public void setUp() throws IOException {
        menu = Menu.builder()
                .name("americano")
                .price("1000")
                .information("직장인의 기본 음료")
                .imagePath("src/main/resources/menuUpload/example/example.jpg")
                .build();
        mockMultipartFile = new MockMultipartFile("example", "example.jpg", "application/form-data",
                new FileInputStream(new File(menu.getImagePath())));
    }

    @Test
    public void 메뉴추가테스트() {
        //TODO : 이미지 파일이 없을 경우와 있을 경우로 나누어서 Test 진행
        //given
        MenuSaveDto menuSaveDto = new MenuSaveDto();
        menuSaveDto.setName(menu.getName());
        menuSaveDto.setPrice(menu.getPrice());
        menuSaveDto.setInformation(menu.getInformation());
        menuSaveDto.setImageFile(mockMultipartFile);

        //when
        Mockito.when(menuRepository.save(menu)).thenReturn(menu);

        //then
        assertThat(menuService.add(menuSaveDto)).isEqualTo(menu.getId());
    }

    @Test
    public void 전체조회_비어있는메뉴목록() {
        //given
        List<Menu> list = new ArrayList<>();

        //when
        Mockito.when(menuRepository.findAll()).thenReturn(list);

        //then
        assertThat(menuService.selectAll()).isEmpty();
    }

    @Test
    public void 전체조회_1개이상의메뉴목록() {
        //given
        List<Menu> list = new ArrayList<>();

        //when
        Mockito.when(menuRepository.findAll()).thenReturn(list);

        //then
        assertThat(menuService.selectAll()).containsAll(list);
    }

    @Test(expected = MenuNotFoundException.class)
    public void 메뉴삭제시_메뉴ID없음() {
        Long menu_id = 0L;

        doThrow(MenuNotFoundException.class).when(menuRepository).deleteById(menu_id);

        menuRepository.deleteById(menu_id);
    }

    @Test
    public void 메뉴_수정() {
        //given
        MenuSaveDto menuSaveDto = new MenuSaveDto();
        menuSaveDto.setName(menu.getName());
        menuSaveDto.setPrice("2000");
        menuSaveDto.setInformation(menu.getInformation());
        menuSaveDto.setImageFile(mockMultipartFile);

        //when
        Mockito.when(menuRepository.save(menu)).thenReturn(menu);
        Mockito.when(menuRepository.findById(1L)).thenReturn(Optional.of(menu));

        menuService.updateMenu(1L, menuSaveDto);
    }

    @Test
    public void 메뉴이미지_저장경로설정() {
        menuService.saveMenuImage(mockMultipartFile);
//        String imagePath = "src/main/resources/menuUpload/"
//                + LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE) + "/example.jpg";
//        assertThat(menuService.saveMenuImage(mockMultipartFile)).isEqualTo(imagePath);
    }

    @Test
    public void 메뉴검색_없는메뉴() {
        //given
        String name = "americano";
        List list = new ArrayList<>();

        //when
        Mockito.when(menuRepository.findByName(name)).thenReturn(list);

        menuService.selectByName(name);
    }

}