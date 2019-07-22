package com.teamonion.tmong.menu;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Getter
@EqualsAndHashCode(of = "id")
@ToString(exclude = "id")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String price;

    private String information;

    private String imagePath;

    void update(MenuSaveDto menuSaveDto) {
        this.name = menuSaveDto.getName();
        this.price = menuSaveDto.getPrice();
        this.information = menuSaveDto.getInformation();
        this.imagePath = menuSaveDto.getImagePath();
    }
}
