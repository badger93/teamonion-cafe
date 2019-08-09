package com.teamonion.tmong.websocket;

import com.teamonion.tmong.order.OrdersController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@WebMvcTest(OrdersController.class)
public class WebSocketControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void updateOrder() {
    }

}