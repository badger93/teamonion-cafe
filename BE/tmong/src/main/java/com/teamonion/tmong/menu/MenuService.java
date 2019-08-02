package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
import com.teamonion.tmong.security.JwtComponent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class MenuService {
    private static final Logger log = LoggerFactory.getLogger(MenuService.class);

    @NonNull
    private final MenuRepository menuRepository;

    @NonNull
    private final ImageFileService imageFileService;

    @NonNull
    private final JwtComponent jwtComponent;

    Long add(MenuSaveDto menuSaveDto) {
        jwtComponent.checkAdmin();

        String path = imageFileService.imageAddProcess(menuSaveDto.getImageFile());

        return menuRepository.save(menuSaveDto.toEntity(path)).getId();
    }

    @Transactional
    public void updateMenu(Long id, MenuSaveDto menuSaveDto) {
        // TODO : 이미지 validation - 메뉴 추가와 수정이 다른 request객체로 받아야 할지 ?
        // TODO : 수정 - 이미지 필수가 아닌 로직으로 변경
        jwtComponent.checkAdmin();

        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));

        String imagePath = menu.getImagePath();
        MultipartFile imageFile = menuSaveDto.getImageFile();

        if (!imageFile.isEmpty()) {
            imageFileService.deleteImageFile(imagePath);
            // TODO : 이미지 존재 여부 중복 확인 수정
            imagePath = imageFileService.imageAddProcess(imageFile);
        }

        menu = menuSaveDto.toEntity(imagePath);
        menu.update(id);
        menuRepository.save(menu);
    }

    Page<Menu> selectAll(Pageable pageable) {
        return menuRepository.findAllByDeletedFalse(pageable);
    }

    Page<Menu> selectByName(Pageable pageable, String name) {
        return menuRepository.findByNameContainingAndDeletedFalse(pageable, name);
    }

    @Transactional
    void deleteByMenuId(Long id) {
        jwtComponent.checkAdmin();

        Menu menu = menuRepository.findById(id).orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));
        String imagePath = menu.getImagePath();

        menu.delete();
        menuRepository.save(menu);

        imageFileService.deleteImageFile(imagePath);
    }

}
