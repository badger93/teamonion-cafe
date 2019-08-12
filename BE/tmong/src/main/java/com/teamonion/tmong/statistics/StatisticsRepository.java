package com.teamonion.tmong.statistics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StatisticsRepository extends JpaRepository<Statistics, Long> {
    Optional<Statistics> findByMemberId(String memberId);

    @Query(value = "select * from statistics where month=?1 order by orders_count desc, modified_date limit 3", nativeQuery = true)
    List<Statistics> findTop3ByMonth(int month);
}
