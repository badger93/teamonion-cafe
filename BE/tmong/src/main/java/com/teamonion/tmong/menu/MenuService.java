package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.MenuNotFoundException;
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

    public void deleteByMenuId(Long menu_id) {
        //TODO : ExceptionHandler EntityNotFoundException으로 처리
        Menu menu = menuRepository.findById(menu_id).orElseThrow(() -> new MenuNotFoundException(menu_id));
        menuRepository.delete(menu);
    }
}
