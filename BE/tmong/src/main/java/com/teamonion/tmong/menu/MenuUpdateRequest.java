package com.teamonion.tmong.menu;

import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "imageFile")
public class MenuUpdateRequest {

    @NotEmpty(message = "메뉴명을 입력해주세요")
    @Length(max = 20)
    private String name;

    @DecimalMin(value = "0", message = "메뉴 가격은 음수입력이 불가능합니다")
    @NotNull
    private Long price;

    private String information;

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
