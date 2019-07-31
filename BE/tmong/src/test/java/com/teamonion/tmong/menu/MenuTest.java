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
                .imagePath("src/main/resources/menuImage/example/example.jpg")
                .build();

        assertThat(menu).isNotNull();
    }

    @Before
    public void setUp() {}

    @Test
    public void UpdateTest() {

    }


}