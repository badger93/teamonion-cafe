package com.teamonion.tmong.menu;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/menus")
@RestController
public class MenuController {

    private static Logger log = LoggerFactory.getLogger(MenuController.class);

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @PostMapping
    public ResponseEntity add(@Valid MenuSaveDto menuSaveDto) {
//        BindingResult bindingResult
//        if(bindingResult.hasErrors()) {
//            new CustomException(CustomExceptionType.MENUIMAGE_NOT_FOUND);
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//        }
        return new ResponseEntity<>(menuService.add(menuSaveDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity selectAll(Pageable pageable) {
        return new ResponseEntity<>(menuService.selectAll(pageable), HttpStatus.OK);
    }

    @DeleteMapping("/{menu_id}")
    public ResponseEntity deleteOne(@PathVariable Long menu_id) {
        menuService.deleteByMenuId(menu_id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/{menu_id}")
    public ResponseEntity updateOne(@PathVariable Long menu_id, @Valid MenuSaveDto menuSaveDto) {
        log.info("수정 내용 : " + menuSaveDto.toString());

        menuService.updateMenu(menu_id, menuSaveDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{menu_name}")
    public ResponseEntity selectByName(@PathVariable String menu_name) {
        return new ResponseEntity<>(menuService.selectByName(menu_name), HttpStatus.OK);
    }
}
