package com.teamonion.tmong.order;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@ToString
public class OrdersUpdateRequest {
<<<<<<< HEAD
    private Long orderId;
=======
    private Long id;
>>>>>>> 33141c4d74ff72273ca2423004597e3c0ee5a3a0
    private String buyerId;
    private boolean paid;
    private boolean made;
    private boolean pickup;
}
