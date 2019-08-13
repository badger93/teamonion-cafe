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

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

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

    public List<Menu> getOrderMenus(List<Long> menuIdList) {
        List<Menu> tempMenusList = menuRepository.findByDeletedFalseAndIdIn(menuIdList.stream().distinct().collect(Collectors.toList()));

        // TODO : 내용물이 다 들어있는지 확인
        // 모두 포함

        log.info("======== tempMenusList =======");

        for (Menu m : tempMenusList) {
            log.info("m.getId() : {}", m.getId());
        }

        if (!tempMenusList.stream().map(Menu::getId).collect(Collectors.toList()).containsAll(menuIdList)) {
            throw new GlobalException(GlobalExceptionType.ORDER_MENU_NOT_FOUND);
        }

        List<Menu> list = new ArrayList<>();

        for (Long id : menuIdList) {
            for (Menu menu : tempMenusList) {
                if (menu.getId().equals(id)) {
                    list.add(menu);
                }
            }
        }

//        list = menuIdList.stream()
//                .filter(id -> tempMenusList.stream().mapToLong(Menu::getId).anyMatch(Predicate.isEqual(id)))
//                .collect(Collectors.toList());

        log.info("======== list =======");

        for (Menu m : list) {
            log.info("m.getId() : {}", m.getId());
        }
//        menuIdList.stream().filter((id) -> tempMenusList.stream().filter(menu -> menu.getId().equals(id)));
//
//        list.add(null);

        // TODO : 차례대로 list에 담기

        // 1,1,2,8
        // 1,2,8 크기 다르고 내용물 다르고
        // 1, 1, 1
        // 1
        // 크기 다르고 내용물은 같고
//        if(menuIdList.size() != list.size()){
//            throw new GlobalException(GlobalExceptionType.ORDER_MENU_NOT_FOUND);
//        }
        return list;
    }
}
