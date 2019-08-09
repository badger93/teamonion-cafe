package com.teamonion.tmong.menu;

import com.teamonion.tmong.member.MemberRole;
import com.teamonion.tmong.security.CheckJwt;
import lombok.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/menus")
@RestController
public class MenuController {
    private static final Logger log = LoggerFactory.getLogger(MenuService.class);

    @NonNull
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @CheckJwt(role = MemberRole.ADMIN)
    @PostMapping
    public ResponseEntity add(@Valid MenuAddRequest menuAddRequest) {
        return new ResponseEntity<>(menuService.add(menuAddRequest), HttpStatus.CREATED);
    }

    @CheckJwt(role = MemberRole.ADMIN)
    @PutMapping("/{menu_id}")
    public ResponseEntity updateOne(@PathVariable Long menu_id, @Valid MenuUpdateRequest menuUpdateRequest) {
        menuService.updateMenu(menu_id, menuUpdateRequest);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity selectAll(
            @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return new ResponseEntity<>(menuService.selectAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity selectByName(Pageable pageable, @RequestParam String menu_name) {
        return new ResponseEntity<>(menuService.selectByName(pageable, menu_name), HttpStatus.OK);
    }

    @CheckJwt(role = MemberRole.ADMIN)
    @DeleteMapping("/{menu_id}")
    public ResponseEntity deleteOne(@PathVariable Long menu_id) {
        menuService.deleteByMenuId(menu_id);
        return new ResponseEntity(HttpStatus.OK);
    }

}
