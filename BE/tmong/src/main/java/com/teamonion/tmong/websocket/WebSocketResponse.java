package com.teamonion.tmong.websocket;

import com.teamonion.tmong.menu.Menu;
import com.teamonion.tmong.order.Orders;
import lombok.Builder;
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
    private boolean valid;
    private String errorMessage;

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
        this.valid = true;
        this.errorMessage = "";
    }

    @Builder
    public WebSocketResponse(Long id, String buyerId, boolean paid, boolean made, boolean pickup
                                , boolean valid, String errorMessage) {
        this.id = id;
        this.buyerId = buyerId;
        this.paid = paid;
        this.made = made;
        this.pickup = pickup;
        this.valid = valid;
        this.errorMessage = errorMessage;
        this.menuNameList = null;
    }
}
