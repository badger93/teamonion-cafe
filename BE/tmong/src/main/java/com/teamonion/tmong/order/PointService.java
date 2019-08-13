package com.teamonion.tmong.order;

import com.teamonion.tmong.exception.GlobalException;
import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.member.MemberService;
import com.teamonion.tmong.websocket.OrdersUpdateRequest;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointService {

    @NonNull
    private final MemberService memberService;

    private static final double BONUS_RATE = 0.1;

    void pointProcess(Orders orders) {
        long buyerOwnPoint = memberService.getPoint(orders.getBuyer().getId());

        if (orders.getPaymentType().equals(PaymentType.POINT)) {
            long point = buyerOwnPoint - orders.getAmount();

            if (point < 0) {
                throw new GlobalException(GlobalExceptionType.ORDER_POINT_LACK);
            }

            memberService.pointUpdate(orders.getBuyer().getId(), point);
//            payByPoint(orders.getBuyer(), buyerOwnPoint, orders.getAmount());
        }
//        addBonusPoint(orders.getBuyer(), buyerOwnPoint, orders.getAmount());
    }

    private long payByPoint(Member buyer, long buyerOwnPoint, long amount) {
        long point = buyerOwnPoint - amount;

        if (point < 0) {
            throw new GlobalException(GlobalExceptionType.ORDER_POINT_LACK);
        }

        return memberService.pointUpdate(buyer.getId(), point);
    }

    public void addBonusPoint(Orders orders) {
        long point = (long) (orders.getAmount() * BONUS_RATE)
                + memberService.getPoint(orders.getBuyer().getId());

        memberService.pointUpdate(orders.getBuyer().getId(), point);
    }

}
