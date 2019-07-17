package com.teamonion.tmong.menu;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;


public class MenuTest {

    @Test
    public void builder() {
        Menu menu = Menu.builder()
                .name("americano")
                .price("1000")
                .information("직장인들의 기본 음료")
                .imagePath("http://localhost:8080/example")
                .build();

        assertThat(menu).isNotNull();
    }


}