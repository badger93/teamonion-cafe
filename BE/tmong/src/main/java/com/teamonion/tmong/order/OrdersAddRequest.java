package com.teamonion.tmong.order;

import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.menu.Menu;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class OrdersAddRequest {
    private PaymentType paymentType;

    private String amount;

//    private LocalDateTime createdDate;

    @NotNull(message = "주문자 정보가 없습니다.")
    private Long member_id;
    private Member buyer;

    @NotNull(message = "주문 메뉴 정보가 없습니다.")
    private List<Long> menuIdList;
    private List<Menu> menuList;

    @NotNull
    private boolean paid;

    private boolean made;
    private boolean pickup;

//    public Orders toEntity() {
//        return Orders.builder()
//                .paymentType(paymentType)
//                .amount(amount)
//                .createdDate(createdDate)
//                .buyer(buyer)
//                .menuList(menuList)
//                .paid(paid)
//                .made(made)
//                .pickup(pickup)
//                .build();
//    }



}
