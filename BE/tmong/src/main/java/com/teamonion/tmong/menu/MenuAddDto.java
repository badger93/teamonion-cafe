package com.teamonion.tmong.menu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.IOException;

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

    @NotNull(message = "이미지를 추가해주세요.")
    private MultipartFile image;

    @Override
    public String toString() {
        return "MenuAddDto{" +
                "name='" + name + '\'' +
                ", price='" + price + '\'' +
                ", information='" + information + '\'' +
                ", image=" + image.getOriginalFilename() +
                '}';
    }

    public Menu toEntity() throws IOException {
        return Menu.builder()
                .name(name)
                .price(price)
                .information(information)
                .imageFile(image.getBytes())
                .build();
    }

}
