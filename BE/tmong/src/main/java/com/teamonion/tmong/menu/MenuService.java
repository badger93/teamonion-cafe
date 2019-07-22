package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.FileStorageException;
import com.teamonion.tmong.exception.MenuNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class MenuService {

    private final MenuRepository menuRepository;

    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    Menu add(MenuAddDto menuAddDto){
        // TODO : 이미지 파일이 아닌 경우 예외처리
        Menu menu = null;
        try {
            if (menuAddDto.getImage().isEmpty()) {
                throw new FileStorageException("이미지 파일이 존재하지 않습니다.");
            }

            menu = menuAddDto.toEntity();
        } catch (IOException e) {
            //throw new FileStorageException(e.getMessage());
            e.getStackTrace();
        }
        return menuRepository.save(menu);
    }

    List<Menu> selectAll() {
        return menuRepository.findAll();
    }

    void deleteByMenuId(Long menu_id) {
        //TODO : ExceptionHandler EntityNotFoundException으로 처리
        if (!isExistMenu(menu_id)) {
            throw new MenuNotFoundException(menu_id);
        }
        menuRepository.deleteById(menu_id);
    }

    boolean isExistMenu(Long menu_id) {
        return menuRepository.findById(menu_id).isPresent();
    }
}
