package com.teamonion.tmong.menu;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/menus")
@RestController
public class MenuController {

    @Autowired
    private MenuService menuService;

    @PostMapping
    public ResponseEntity add(@RequestBody Menu menu) {
        menuService.add(menu);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity selectAll() {
        return new ResponseEntity(menuService.selectAll(), HttpStatus.OK);
    }
}
