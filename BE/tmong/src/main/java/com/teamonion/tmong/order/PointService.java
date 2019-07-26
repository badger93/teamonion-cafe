package com.teamonion.tmong.order;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.member.MemberRepository;
import com.teamonion.tmong.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointService {

    private final MemberRepository memberRepository;
    private final MemberService memberService;

    private static final double BONUS_RATE = 0.1;

    void pointProcess(Orders orders) {
        long buyerOwnPoint = getBuyerPoint(orders.getBuyer().getId());
        if (orders.getPaymentType().equals(PaymentType.POINT)) {
            buyerOwnPoint = payByPoint(orders.getBuyer(), buyerOwnPoint, orders.getAmount());
        }
        addBonusPoint(orders.getBuyer(), buyerOwnPoint, orders.getAmount());
    }

    private long getBuyerPoint(Long id) {
        return memberService.getPoint(id);
    }

    private long payByPoint(Member buyer, long buyerOwnPoint, long amount) {
        long point = buyerOwnPoint - amount;

        if (point < 0) {
            throw new HandleRuntimeException(GlobalExceptionType.ORDER_POINT_LACK);
        }

        return pointUpdate(buyer.getId(), point);
    }

    private void addBonusPoint(Member buyer, long buyerOwnPoint, long amount) {
        long point = (long) (amount * BONUS_RATE) + buyerOwnPoint;

        pointUpdate(buyer.getId(), point);
    }

    private long pointUpdate(Long id, long point) {
        Member member =  memberService.findById(id);
        member.pointUpdate(point);
        return memberRepository.save(member).getPoint();
    }


}
