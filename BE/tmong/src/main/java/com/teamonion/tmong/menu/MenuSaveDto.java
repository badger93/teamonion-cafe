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

    @NotBlank(message = "메뉴명을 입력해주세요.")
    private String name;

    @NotBlank(message = "가격을 입력해주세요.")
    @Pattern(regexp = "^[0-9]*$", message = "숫자만 입력가능합니다.")
    // TODO : 금액 조건 추가하기 (0원 이상)
    private String price;

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
