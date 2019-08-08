package com.teamonion.tmong.statistics;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class OrdersRankingResponse {
    private List<OrdersRank> ranking;

    public OrdersRankingResponse() {
        ranking = new ArrayList<>();
    }

    public void add(int rank, String memberId, int count) {
        ranking.add(new OrdersRank(rank, memberId, count));
    }
}
