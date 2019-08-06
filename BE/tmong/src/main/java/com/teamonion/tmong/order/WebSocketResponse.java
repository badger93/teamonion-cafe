package com.teamonion.tmong.order;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class WebSocketResponse {
    private Long id;
    private String buyerId;
    private boolean paid;
    private boolean made;
    private boolean pickup;

    public WebSocketResponse(Orders orders) {
        this.id = orders.getId();
        this.buyerId = orders.getBuyer().getMemberId();
        this.paid = orders.isPaid();
        this.made = orders.isMade();
        this.pickup = orders.isPickup();
    }
}
