package com.teamonion.tmong.statistics;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Statistics {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private int month;

    @Column(nullable = false)
    private String memberId;

    @Column(nullable = false)
    private int ordersCount;

    private LocalDateTime modifiedDate;

    Statistics(String memberId) {
        this.month = LocalDateTime.now().getMonthValue();
        this.memberId = memberId;
        this.ordersCount = 0;
    }

    public void countUp() {
        this.ordersCount++;
    }

    public void refreshModifiedDate() {
        modifiedDate = LocalDateTime.now();
    }
}
