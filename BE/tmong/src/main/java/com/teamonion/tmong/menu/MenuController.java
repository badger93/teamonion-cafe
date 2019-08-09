package com.teamonion.tmong.menu;

import com.teamonion.tmong.member.MemberRole;
import com.teamonion.tmong.security.CheckJwt;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/menus")
@RestController
@RequiredArgsConstructor
public class MenuController {

    @NonNull
    private final MenuService menuService;

    @CheckJwt(role = MemberRole.ADMIN)
    @PostMapping
    public ResponseEntity<Long> add(@Valid MenuAddRequest menuAddRequest) {
        return new ResponseEntity<>(menuService.add(menuAddRequest), HttpStatus.CREATED);
    }

    @CheckJwt(role = MemberRole.ADMIN)
    @PutMapping("/{menu_id}")
    public ResponseEntity updateOne(@PathVariable Long menu_id, @Valid MenuUpdateRequest menuUpdateRequest) {
        menuService.updateMenu(menu_id, menuUpdateRequest);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<Menu>> selectAll(
            @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return new ResponseEntity<>(menuService.selectAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Menu>> selectByName(Pageable pageable, @RequestParam String menu_name) {
        return new ResponseEntity<>(menuService.selectByName(pageable, menu_name), HttpStatus.OK);
    }

    @CheckJwt(role = MemberRole.ADMIN)
    @DeleteMapping("/{menu_id}")
    public ResponseEntity deleteOne(@PathVariable Long menu_id) {
        menuService.deleteByMenuId(menu_id);
        return new ResponseEntity(HttpStatus.OK);
    }

}


