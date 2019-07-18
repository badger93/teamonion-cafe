package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.MenuNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/api/menus")
@RestController
public class MenuController {

    private static Logger log = LoggerFactory.getLogger(MenuController.class);

    @Autowired
    private MenuService menuService;

    @PostMapping
    public ResponseEntity add(@RequestBody @Valid MenuAddDto menuAddDto) {
        //TODO : menu image 처리

        menuService.add(menuAddDto);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity selectAll() {
        List<Menu> menus = menuService.selectAll();
        return new ResponseEntity(menus, HttpStatus.OK);
    }

    @DeleteMapping("/{menu_id}")
    public ResponseEntity deleteMenu(@PathVariable Long menu_id) {
        menuService.deleteByMenuId(menu_id);

        return new ResponseEntity(HttpStatus.OK);
    }
}
