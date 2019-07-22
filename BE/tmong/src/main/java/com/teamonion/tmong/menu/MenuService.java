package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.MenuNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class MenuService {
    private static Logger log = LoggerFactory.getLogger(MenuController.class);

    private final MenuRepository menuRepository;

    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    Menu add(MenuSaveDto menuSaveDto) {
        // TODO : 이미지 파일이 아닌 경우 예외처리
        MultipartFile imageFile = menuSaveDto.getImageFile();

        if (!imageFile.getOriginalFilename().isEmpty()) {
            menuSaveDto.setImagePath(saveMenuImage(imageFile));

            Menu menu = menuSaveDto.toEntity();
            return menuRepository.save(menu);
        } else {
            //TODO : Error 처리 - 이미지 부재
            //throw new FileStorageException("이미지 파일이 존재하지 않습니다.");
        }

        return null;
    }

    List<Menu> selectAll() {
        return menuRepository.findAll();
    }

    Optional findExistMenu(Long menu_id) {
        //return menuRepository.existsById(menu_id);
    }

    public void updateMenu(Long menu_id, MenuSaveDto menuSaveDto) {
        if (!menuRepository.findById(menu_id).isPresent()) {
            //TODO : Error 처리 - 이미지 부재
            throw new MenuNotFoundException(menu_id);
        }
        Menu menu = menuRepository.findById(menu_id).get();

        MultipartFile imageFile = menuSaveDto.getImageFile();

        if (!imageFile.getOriginalFilename().isEmpty()) {
            menuSaveDto.setImagePath(saveMenuImage(menuSaveDto.getImageFile()));

            menu.update(menuSaveDto);

            menuRepository.save(menu);
        } else {
            //TODO : Error 처리 - 이미지 부재
        }
    }

    public String saveMenuImage(MultipartFile imageFile) {
        try {
            String DOWNLOAD_PATH = "src/main/resources/menuUpload";
            String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();

            Path path = Paths.get(DOWNLOAD_PATH + "/" + fileName);

            imageFile.transferTo(path);

            return DOWNLOAD_PATH + "/" + fileName;
        } catch (IOException e) {
            //TODO : Error 처리 - transferTo 에러 시 ExceptionHandler 적용
            e.printStackTrace();
            return "";
        }
    }

    void deleteByMenuId(Long menu_id) {
        //TODO : ExceptionHandler EntityNotFoundException으로 처리
//        if (!isExistMenu(menu_id)) {
//            throw new MenuNotFoundException(menu_id);
//        }
        //TODO : 파일 내 이미지 정보 삭제

        menuRepository.deleteById(menu_id);
    }


    public Menu selectOne(String menu_name) {
        if (menuRepository.findByName(menu_name).isPresent()) {
            return menuRepository.findByName(menu_name).get();
        }
        // TODO : 없을 경우 예외처리 혹은 반환값 처리
        return null;
    }
}
