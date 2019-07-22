package com.teamonion.tmong.menu;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
        log.info(menuSaveDto.toString());

        menuService.add(menuSaveDto);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity selectAll() {
        List<Menu> menus = menuService.selectAll();
        return new ResponseEntity(menus, HttpStatus.OK);
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
    public ResponseEntity selectOne(@PathVariable String menu_name) {
        Menu menu = menuService.selectOne(menu_name);
        return new ResponseEntity(menu, HttpStatus.OK);
    }
}
