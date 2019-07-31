package com.teamonion.tmong.order;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class OrdersUpdateRequest {
    private Long order_id;
    private Long buyer_id;
    private boolean paid;
    private boolean made;
    private boolean pickup;
}
