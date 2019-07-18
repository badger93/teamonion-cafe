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
        if(!isExistMenu(menu_id)) {
            throw new MenuNotFoundException(menu_id);
        }
        menuRepository.deleteById(menu_id);
    }

    public boolean isExistMenu(Long menu_id) {
        if(menuRepository.findById(menu_id).isPresent()){
            return true;
        }
        return false;
    }
}
