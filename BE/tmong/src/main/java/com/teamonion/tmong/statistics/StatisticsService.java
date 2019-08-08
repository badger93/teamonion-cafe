package com.teamonion.tmong.statistics;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class StatisticsService {
    @NonNull
    private final StatisticsRepository statisticsRepository;

    public OrdersRankingResponse getTop3MemberForOrder() {
        OrdersRankingResponse ordersRankingResponse = new OrdersRankingResponse();
        List<Statistics> top3 = statisticsRepository.findTop3ByMonth(LocalDateTime.now().getMonthValue());
        int rank = 0;
        int ordersCount = 0;

        for (Statistics statistics : top3) {
            if(ordersCount != statistics.getOrdersCount()) {
                rank++;
                ordersCount = statistics.getOrdersCount();
            }
            ordersRankingResponse.add(rank, statistics.getMemberId(), ordersCount);
        }
        return ordersRankingResponse;
    }

    @Async
    public void save(String memberId) {
        Statistics statistics = statisticsRepository.findByMemberId(memberId).orElseGet(() -> new Statistics(memberId));
        statistics.countUp();
        statistics.updateModifiedDate();
        statisticsRepository.save(statistics);
    }
}
