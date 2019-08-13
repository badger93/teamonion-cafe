package com.teamonion.tmong.menu;

import com.teamonion.tmong.authorization.JwtComponent;
import com.teamonion.tmong.exception.GlobalException;
import com.teamonion.tmong.exception.GlobalExceptionType;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.LongPredicate;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static java.util.function.Function.identity;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toMap;

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

    // TODO : 이미지 저장 후 DB 저장,
    // TODO : DB저장 실패했을 경우 저장된 이미지 삭제되도록 !
    Long add(MenuAddRequest menuAddRequest) {
        String path = imageFileService.imageSaveProcess(menuAddRequest.getImageFile());

        Menu addedMenu = menuRepository.save(menuAddRequest.toEntity(path));

        // TODO : save 실패 시 ?
        if (addedMenu == null) {
            imageFileService.deleteImageFile(path);
//            throw new RuntimeException("메뉴를 추가하는데 실패했습니다. - DB Connection");
        }

        return addedMenu.getId();
    }

    @Transactional
    public void updateMenu(Long id, MenuUpdateRequest menuUpdateRequest) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new GlobalException(GlobalExceptionType.MENU_NOT_FOUND));

        String imagePath = menu.getImagePath();
        MultipartFile imageFile = menuUpdateRequest.getImageFile();

        if (imageFile != null) {
            imageFileService.deleteImageFile(imagePath);
            imagePath = imageFileService.imageSaveProcess(imageFile);
        }

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
                .orElseThrow(() -> new GlobalException(GlobalExceptionType.MENU_NOT_FOUND));
        String imagePath = menu.getImagePath();

        menu.delete();
        menuRepository.save(menu);

        imageFileService.deleteImageFile(imagePath);
    }

    public List<Menu> getMenus(List<Long> menuIds) {
        Map<Long, Menu> menus = getValidMenus(menuIds);

        return menuIds.stream()
                .map(menus::get)
                .collect(toList());
    }

    private Map<Long, Menu> getValidMenus(List<Long> menuIds) {
        Map<Long, Menu> menus = menuRepository.findByDeletedFalseAndIdIn(menuIds)
                .stream()
                .distinct()
                .collect(toMap(Menu::getId, identity()));

        // 주문한 메뉴가 주문 가능한 메뉴인지 확인
        if(menus.keySet().containsAll(menuIds)){
            throw new GlobalException(GlobalExceptionType.ORDER_MENU_NOT_FOUND);
        }

        return  menus;
    }
}
