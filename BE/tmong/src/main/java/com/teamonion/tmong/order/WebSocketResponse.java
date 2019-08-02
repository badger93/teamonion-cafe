package com.teamonion.tmong.order;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class WebSocketResponse {

    private Long id;
    private String buyerId;
    private boolean pickup;
    private boolean paid;
    private boolean made;

    public WebSocketResponse(Orders orders) {
        this.id = orders.getId();
        this.buyerId = orders.getBuyer().getMemberId();
        this.pickup = orders.isPickup();
        this.paid = orders.isPaid();
        this.made = orders.isMade();
    }
}
