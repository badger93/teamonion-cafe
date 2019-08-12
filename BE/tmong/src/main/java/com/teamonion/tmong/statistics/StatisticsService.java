package com.teamonion.tmong.statistics;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class StatisticsService {

    @NonNull
    private final StatisticsRepository statisticsRepository;

    public OrdersRankingResponse getTop3MemberForOrder() {
        OrdersRankingResponse ordersRankingResponse = new OrdersRankingResponse();
        int rank = 0;
        int ordersCount = 0;

        for (Statistics statistics : statisticsRepository.findTop3ByMonth(LocalDateTime.now().getMonthValue())) {
            if (ordersCount != statistics.getOrdersCount()) {
                rank++;
                ordersCount = statistics.getOrdersCount();
            }
            ordersRankingResponse.add(rank, statistics.getMemberId(), ordersCount);
        }
        return ordersRankingResponse;
    }

    /**
     * Async 에서 특정 쓰레드풀을 지정하려면 실행자 이름을 속성값으로 지정해 주어야 할텐데요
     * 그게 아니라면 어떤 스레드풀에서 도는지 확인해보는 것도 좋을 거 같네요
     */
    @Async
    public void save(String memberId) {
        Statistics statistics = statisticsRepository.findByMemberId(memberId).orElseGet(() -> new Statistics(memberId));
        statistics.countUp();
        statistics.refreshModifiedDate();
        statisticsRepository.save(statistics);
    }
}
