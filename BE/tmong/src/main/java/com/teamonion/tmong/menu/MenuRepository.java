package com.teamonion.tmong.menu;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    Page<Menu> findByNameContainingAndDeletedFalse(Pageable pageable, String name);

    Page<Menu> findAllByDeletedFalse(Pageable pageable);

    List<Menu> findByDeletedFalseAndIdIn(List<Long> menuIds);

    // TODO : 커넥션 줄이기
    Optional<Menu> findByIdAndDeletedFalse(Long id);

}
