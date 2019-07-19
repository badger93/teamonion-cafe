package com.teamonion.tmong.menu;

import lombok.*;

import javax.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Getter
@EqualsAndHashCode(of = "id")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String price;

    private String information;

    @Lob
    private byte[] imageFile;

}
