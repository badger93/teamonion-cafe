package com.teamonion.tmong.order;

import com.teamonion.tmong.menu.Menu;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class OrdersHistoryResponse {
    private Long id;
    private LocalDateTime createdDate;
    private long amount;
    private boolean pickup;
    private boolean paid;
    private boolean made;
    private List<String> menuNameList;

    public OrdersHistoryResponse(Orders orders) {
        this.id = orders.getId();
        this.createdDate = orders.getCreatedDate();
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
