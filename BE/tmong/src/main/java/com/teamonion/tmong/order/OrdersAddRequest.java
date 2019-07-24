package com.teamonion.tmong.order;

import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.menu.Menu;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class OrdersAddRequest {

    private PaymentType paymentType;

    @NotNull(message = "주문자 정보가 없습니다")
    private Long member_id;

    @NotNull(message = "주문 메뉴 정보가 없습니다")
    private List<Long> menuIdList;

    private boolean paid;

    Orders toEntity(String amount, Member buyer, List<Menu> menuList) {
        return Orders.builder()
                .paymentType(paymentType)
                .amount(amount)
                .buyer(buyer)
                .menuList(menuList)
                .paid(paid)
                .build();
    }


}
