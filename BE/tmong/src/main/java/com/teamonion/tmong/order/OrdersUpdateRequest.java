package com.teamonion.tmong.order;

import com.teamonion.tmong.websocket.WebSocketResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@ToString
public class OrdersUpdateRequest {
    private Long id;
    private String buyerId;
    private boolean paid;
    private boolean made;
    private boolean pickup;

    // TODO : 에러 발생 시 에러 정보 처리 - valid 무조건 false
    // TODO : 메소드명 수정
    WebSocketResponse toEntity(boolean valid, String errorMessage) {
        return WebSocketResponse.builder()
                .id(id)
                .buyerId(buyerId)
                .paid(paid)
                .made(made)
                .pickup(pickup)
                .valid(valid)
                .errorMessage(errorMessage)
                .build();
    }
}
