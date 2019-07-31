package com.teamonion.tmong.order;

import com.teamonion.tmong.menu.Menu;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@ToString
public class OrdersResponse {
    private Long id;
    private String buyerId;
    private LocalDateTime createdDate;
    private PaymentType paymentType;
    private long amount;
    private boolean pickup;
    private boolean paid;
    private boolean made;
    private List<String> menuNameList;

    public OrdersResponse(Orders orders) {
        this.id = orders.getId();
        this.buyerId = orders.getBuyer().getMemberId();
        this.createdDate = orders.getCreatedDate();
        this.paymentType = orders.getPaymentType();
        this.amount = orders.getAmount();
        this.pickup = orders.isPickup();
        this.paid = orders.isPaid();
        this.made = orders.isMade();
        this.menuNameList = orders.getMenuList()
                .stream()
                .map(Menu::getName)
                .collect(Collectors.toList());
    }

}
