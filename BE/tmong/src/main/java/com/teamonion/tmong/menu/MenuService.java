package com.teamonion.tmong.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    public Menu add(MenuAddDto menuAddDto) {
        Menu menu = menuAddDto.toEntity();
        return menuRepository.save(menu);
    }

    public List<Menu> selectAll() {
        List<Menu> allMenus = menuRepository.findAll();
        return allMenus;
    }


}
