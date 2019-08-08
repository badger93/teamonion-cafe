package com.teamonion.tmong.statistics;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/statistics")
@RestController
public class StatisticsController {
    @NonNull
    private final StatisticsService statisticsService;

    @GetMapping("/orders/rank")
    public ResponseEntity<OrdersRankingResponse> getTop3MemberForOrder() {
        return new ResponseEntity<>(statisticsService.getTop3MemberForOrder(), HttpStatus.OK);
    }
}
