package com.teamonion.tmong.menu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MenuAddDto {

    @NotBlank(message = "메뉴명을 입력해주세요.")
    private String name;

    @NotBlank(message = "가격을 입력해주세요.")
    @Pattern(regexp = "^[0-9]*$", message = "숫자만 입력가능합니다.")
    private String price;

    private String information;

    @NotBlank(message = "이미지를 추가해주세요.")
    private String imagePath;

    //image 서버 저장

    public Menu toEntity() {
        return Menu.builder()
                .name(name)
                .price(price)
                .information(information)
                .imagePath(imagePath)
                .build();
    }

}
