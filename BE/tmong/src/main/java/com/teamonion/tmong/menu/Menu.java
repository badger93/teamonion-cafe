package com.teamonion.tmong.menu;

import lombok.*;

import javax.persistence.*;


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

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long price;

    @Lob
    private String information;

    @Column(nullable = false)
    private String imagePath;

    @Column(nullable = false)
    private boolean deleted = false;

    void delete() {
        this.deleted = true;
    }

    void update(Long id) {
        this.id = id;
    }
}
