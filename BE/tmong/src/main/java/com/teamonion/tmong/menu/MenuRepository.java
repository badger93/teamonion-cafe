package com.teamonion.tmong.menu;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    List<Menu> findByNameAndDeletedFalse(String name);

    Page<Menu> findAllByDeletedFalse(Pageable pageable);

}
