package com.teamonion.tmong.order;

import com.teamonion.tmong.member.Member;
import lombok.Getter;

@Getter
public class OrdersAddResponse {
    private Long order_id;
    private String point;

    public OrdersAddResponse(Member member, Orders orders){
        this.order_id = orders.getId();
        this.point =  member.getPoint();
    }
}
