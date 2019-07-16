package com.teamonion.tmong.menu;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    private static Logger logger = LoggerFactory.getLogger(MenuController.class);

    @Autowired
    private MenuRepository menuRepository;

    public Menu add(Menu menu) {
        Menu savedMenu = menuRepository.save(menu);
        return savedMenu;
    }

    public List<Menu> selectAll() {
        List<Menu> allMenus = menuRepository.findAll();
        return allMenus;
    }


}
