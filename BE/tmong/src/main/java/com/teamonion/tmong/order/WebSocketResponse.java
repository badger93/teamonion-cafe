package com.teamonion.tmong.order;

import com.teamonion.tmong.menu.Menu;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@ToString
public class WebSocketResponse {
    private Long id;
    private String buyerId;
    private boolean paid;
    private boolean made;
    private boolean pickup;
    private List<String> menuNameList;

    public WebSocketResponse(Orders orders) {
        this.id = orders.getId();
        this.buyerId = orders.getBuyer().getMemberId();
        this.paid = orders.isPaid();
        this.made = orders.isMade();
        this.pickup = orders.isPickup();
        this.menuNameList = orders.getMenuList()
                .stream()
                .map(Menu::getName)
                .collect(Collectors.toList());
    }
}
