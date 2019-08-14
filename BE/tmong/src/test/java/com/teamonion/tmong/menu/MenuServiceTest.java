package com.teamonion.tmong.menu;

import com.teamonion.tmong.authorization.JwtComponent;
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

/**
 * 특정 공간에 저장/수정/삭제를 해보는 통합테스트를 작성해보면 어떨까요
 */
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

    /**
     * 메뉴가 파일로 저장되는 경우를 어떻게 테스트를 해볼 수 있을까요?
     */
    @Test
    public void 메뉴추가테스트() {
        menu = menuAddRequest.toEntity("test");

        Mockito.when(menuRepository.save(menu)).thenReturn(menu);

        assertThat(menuService.add(menuAddRequest)).isEqualTo(menu.getId());
    }

    /**
     * 메뉴가 파일에서 수정되는 경우를 어떻게 테스트를 해볼 수 있을까요?
     */
    @Test
    public void 메뉴수정테스트() {
        Long id = 1L;
        // TODO : 이미지 경로
        Mockito.when(menuRepository.findById(id)).thenReturn(Optional.of(menu));

        menuService.updateMenu(id, menuUpdateRequest);
    }

    /**
     * 메뉴가 파일에서 삭제되는 경우를 어떻게 테스트를 해볼 수 있을까요?
     */
    @Test
    public void 메뉴삭제테스트() {
        Long id = 1L;

        Mockito.when(menuRepository.findById(id)).thenReturn(Optional.of(menu));

        menuService.deleteByMenuId(id);

    }

    /**
     * 다 동일한 이슈인데 특정 케이스를 확인하기 어려운 부분이죠
     * 잘 쓴글이 별로 없는 듯 보이는데 필요하다면 stub 에 대해서 찾아보세요
     * https://medium.com/@SlackBeck/%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%8A%A4%ED%85%81-test-stub-%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-ff9c8840c1b0
     */

}