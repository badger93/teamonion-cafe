package com.teamonion.tmong.menu;

import com.teamonion.tmong.authorization.JwtComponent;
import com.teamonion.tmong.exception.GlobalException;
import com.teamonion.tmong.exception.MenuExceptionType;
import com.teamonion.tmong.exception.OrdersExceptionType;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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

    Long add(MenuAddRequest menuAddRequest) {
        String path = imageFileService.imageSaveProcess(menuAddRequest.getImageFile());

        Menu addedMenu = menuRepository.save(menuAddRequest.toEntity(path));

        // TODO : save 실패 시 저장된 이미지 관리

        return addedMenu.getId();
    }

    @Transactional
    public void updateMenu(Long id, MenuUpdateRequest menuUpdateRequest) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new GlobalException(MenuExceptionType.MENU_NOT_FOUND));

        MultipartFile imageFile = menuUpdateRequest.getImageFile();
        String imagePath = imageFileService.imageUpdateProcess(imageFile, menu.getImagePath());
        ;

        menu = menuUpdateRequest.toEntity(imagePath);
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
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new GlobalException(MenuExceptionType.MENU_NOT_FOUND));
        String imagePath = menu.getImagePath();

        menu.delete();
        menuRepository.save(menu);

        imageFileService.deleteImageFile(imagePath);
    }

    public List<Menu> getOrderMenus(List<Long> menuIdList) {
        List<Menu> list = menuRepository.findByDeletedFalseAndIdIn(menuIdList);

        if (menuIdList.size() != list.size()) {
            throw new GlobalException(OrdersExceptionType.ORDER_MENU_NOT_FOUND);
        }
        return list;
    }
}
