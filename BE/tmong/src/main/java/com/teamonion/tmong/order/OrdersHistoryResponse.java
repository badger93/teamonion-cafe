package com.teamonion.tmong.order;

import com.teamonion.tmong.menu.Menu;
import lombok.Getter;
import org.hibernate.criterion.Order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class OrdersHistoryResponse {
    private Long id;
    private String buyerName;
    private LocalDateTime createdDate;
    private long amount;
    private boolean pickup;
    private boolean paid;
    private boolean made;
    private List<String> menuNameList;
    private PaymentType paymentType;

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

    public static OrdersHistoryResponse toOrderHistoryResponse(Orders orders) {
        return new OrdersHistoryResponse(null);
    }

    static OrdersHistoryResponse AllOrdersHistoryResponse(Orders orders) {
        OrdersHistoryResponse ordersHistoryResponse = new OrdersHistoryResponse(orders);
        ordersHistoryResponse.id = orders.getId();
        ordersHistoryResponse.buyerName = orders.getBuyer().getMemberId();
        ordersHistoryResponse.paymentType = orders.getPaymentType();
        ordersHistoryResponse.amount = orders.getAmount();
        ordersHistoryResponse.createdDate = orders.getCreatedDate();
        ordersHistoryResponse.paid = orders.isPaid();
        ordersHistoryResponse.made = orders.isMade();
        ordersHistoryResponse.pickup = orders.isPickup();

        return ordersHistoryResponse;
    }

}
