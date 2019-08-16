package com.teamonion.tmong.menu;

import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "imageFile")
public class MenuAddRequest {

    @NotEmpty(message = "메뉴명을 입력해주세요")
    @Length(max = 20, message = "메뉴명은 20자 이내로 입력해주세요")
    private String name;

    @DecimalMin(value = "0", message = "메뉴 가격은 음수입력이 불가능합니다")
    @DecimalMax(value = "100000000", message = "메뉴 가격은 1억 이하로 입력해주세요")
    @NotNull
    private Long price;

    private String information;

    @NotNull(message = "이미지를 추가해주세요")
    private MultipartFile imageFile;

    public Menu toEntity(String imagePath) {
        return Menu.builder()
                .name(name)
                .price(price)
                .information(information)
                .imagePath(imagePath)
                .deleted(false)
                .build();
    }

}
