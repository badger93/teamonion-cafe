package com.teamonion.tmong.menu;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "imageFile")
public class MenuSaveDto {

    @NotEmpty(message = "메뉴명을 입력해주세요.")
    private String name;

    @Min(value = 0,message = "가격을 입력해주세요.")
    private long price;

    private String information;

    @NotNull(message = "이미지를 추가해주세요.")
    private MultipartFile imageFile;

    private String imagePath;

    public Menu toEntity() {
        return Menu.builder()
                .name(name)
                .price(price)
                .information(information)
                .imagePath(imagePath)
                .build();
    }

}
