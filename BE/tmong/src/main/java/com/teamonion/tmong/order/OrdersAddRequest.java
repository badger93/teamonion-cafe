package com.teamonion.tmong.order;

import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.menu.Menu;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Setter
@Getter
public class OrdersAddRequest {

    @NotNull(message = "결제 방식이 필요합니다")
    private PaymentType paymentType;

    @NotEmpty(message = "주문 메뉴 정보가 필요합니다")
    private List<Long> menuIdList;

    @NotNull(message = "결제 여부 정보가 필요합니다")
    private boolean paid;

    Orders toEntity(Member buyer, List<Menu> menuList) {
        return Orders.builder()
                .paymentType(paymentType)
                .amount(menuList.stream().mapToLong(Menu::getPrice).sum())
                .buyer(buyer)
                .menuList(menuList)
                .paid(paid)
                .build();
    }


}
