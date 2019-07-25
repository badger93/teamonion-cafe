package com.teamonion.tmong.menu;

import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;


public class MenuTest {

    private Menu menu;

    @Test
    public void builder() {
        menu = Menu.builder()
                .name("americano")
                .price(1000)
                .information("직장인들의 기본 음료")
                .imagePath("src/main/resources/menuUpload/example/example.jpg")
                .build();

        assertThat(menu).isNotNull();
    }

    @Before
    public void setUp() {}

    @Test
    public void UpdateTest() {
        String name = "maesil";
        long price = 1200;
        String information = "장에 좋은 음료";
        String imagePath = "src/main/resources/menuUpload/example/example2.png";

        MenuSaveDto menuSaveDto = new MenuSaveDto(name, price, information, null, imagePath);

        menu.update(menuSaveDto);
        assertThat(menu.getName()).isEqualTo(name);
        assertThat(menu.getPrice()).isEqualTo(price);
        assertThat(menu.getInformation()).isEqualTo(information);
        assertThat(menu.getImagePath()).isEqualTo(imagePath);
    }


}