package com.teamonion.tmong.statistics;

import lombok.Getter;

@Getter
public class OrdersRank {
    private int rank;
    private String memberId;
    private int count;

    public OrdersRank(int rank, String memberId, Integer count) {
        this.rank = rank;
        this.memberId = memberId;
        this.count = count;
    }
}
