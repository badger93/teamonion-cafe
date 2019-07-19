package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.MenuNotFoundException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class MenuServiceTest {

    @Mock
    MenuRepository menuRepository;

    @InjectMocks
    MenuService menuService;

    @Test
    public void 메뉴추가테스트() throws IOException {
        //TODO : 이미지 파일이 없을 경우와 있을 경우로 나누어서 Test 진행
        //given
        MenuAddDto menuAddDto = new MenuAddDto();
        menuAddDto.setName("americano");
        menuAddDto.setPrice("1000");
        menuAddDto.setInformation("직장인의 인기 메뉴");
        menuAddDto.setImage(null);

        Menu menu = menuAddDto.toEntity();

        //when
        Mockito.when(menuRepository.save(menu)).thenReturn(menu);

        //then
        assertThat(menuService.add(menuAddDto)).isEqualTo(menu);
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
    public void 메뉴삭제시_메뉴ID있음() {
        //TODO : 재컴토 필요
        //given
        Long menu_id = 1L;

        //when
        when(menuRepository.findById(menu_id)).thenReturn(Optional.of(Menu.builder()
                .id(1L)
                .name("americano")
                .price("1000")
                .information("직장인의 인기 메뉴")
                //.imagePath("example")
                .build()));


        //then
        assertThat(menuService.isExistMenu(menu_id)).isTrue();
    }
}