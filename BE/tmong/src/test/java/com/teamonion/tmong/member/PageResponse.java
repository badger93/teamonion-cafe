package com.teamonion.tmong.member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class PageResponse {
    private Member[] content;

    private Pageable pageable;
}
