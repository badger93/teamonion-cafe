package com.teamonion.tmong.menu;

import com.teamonion.tmong.security.JwtComponent;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mock.web.MockMultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(MockitoJUnitRunner.class)
public class MenuServiceTest {

    @Mock
    MenuRepository menuRepository;

    @Mock
    JwtComponent jwtComponent;

    @Mock
    ImageFileService imageFileService;

    @InjectMocks
    MenuService menuService;

    private Menu menu;
    private MenuAddRequest menuAddRequest;
    private MenuUpdateRequest menuUpdateRequest;

    @Before
    public void setUp() throws IOException {
        menuAddRequest = new MenuAddRequest();
        menuUpdateRequest = new MenuUpdateRequest();

        MockMultipartFile mockMultipartFile = new MockMultipartFile("test", "test", "image/jpg"
                , new FileInputStream(new File("src/test/resources/cat.jpg")));

        MockMultipartFile mockEmptyMultipartFile = new MockMultipartFile("test", null, null, (byte[]) null);

        menuAddRequest.setImageFile(mockMultipartFile);
        menuUpdateRequest.setImageFile(mockEmptyMultipartFile);

        menu = new Menu();
        menu.update(1L);
    }

    @Test
    public void 메뉴추가테스트() {
        menu = menuAddRequest.toEntity("test");

        Mockito.when(menuRepository.save(menu)).thenReturn(menu);

        assertThat(menuService.add(menuAddRequest)).isEqualTo(menu.getId());
    }

    @Test
    public void 메뉴수정테스트() {
        Long id = 1L;
        // TODO : 이미지 경로
        Mockito.when(menuRepository.findById(id)).thenReturn(Optional.of(menu));

        menuService.updateMenu(id, menuUpdateRequest);
    }

    @Test
    public void 메뉴삭제테스트() {
        Long id = 1L;

        Mockito.when(menuRepository.findById(id)).thenReturn(Optional.of(menu));

        menuService.deleteByMenuId(id);

    }

}