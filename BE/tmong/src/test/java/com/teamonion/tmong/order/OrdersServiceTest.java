package com.teamonion.tmong.order;

import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.member.MemberService;
import com.teamonion.tmong.menu.Menu;
import com.teamonion.tmong.menu.MenuAddRequest;
import com.teamonion.tmong.menu.MenuRepository;
import com.teamonion.tmong.security.JwtComponent;
import org.aspectj.weaver.ast.Or;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;

@RunWith(MockitoJUnitRunner.class)
public class OrdersServiceTest {

    @Mock
    OrdersRepository ordersRepository;

    @Mock
    MenuRepository menuRepository;

    @Mock
    MemberService memberService;

    @Mock
    PointService pointService;

    @Mock
    JwtComponent jwtComponent;

    @Autowired
    TestRestTemplate template;

    @InjectMocks
    OrdersService ordersService;

    private Pageable pageable;
    private Page<Orders> ordersCategoryResponse;

    @Before
    public void setUp() {
        pageable = PageRequest.of(0, 20);
        List<Orders> list = new ArrayList<>();
        ordersCategoryResponse = new PageImpl<>(list);
    }
    // TODO : 현준님께 질문
//    @Test
//    public void 주문진행2() {
//        List<Long> menuIdList = Arrays.asList(1L, 2L, 3L);
//        OrdersAddRequest ordersAddRequest = new OrdersAddRequest();
//        ordersAddRequest.setMenuIdList(menuIdList);
//
//        Menu menu = Menu.builder()
//                .price(1000L)
//                .build();
//
//        Mockito.when(menuRepository.findByIdAndDeletedFalse(any())).thenReturn(Optional.of(menu));
//
//        ordersService.makeOrder(ordersAddRequest);
//    }


//    private Orders orders;
//    private Menu menu;

//
//    @Test
//    public void 주문진행() {
//        //given
//        List<Long> menuIdList = Arrays.asList(1L, 2L, 3L);
//
//        MenuAddRequest menuAddRequest = new MenuAddRequest();
//        menuAddRequest.setPrice(1000L);
//        menu = menuAddRequest.toEntity("example");
//
//        Member member = Member.builder()
//                .memberId("onion")
//                .password("123456789a")
//                .build();
//
//        orders = Orders.builder()
//                .amount(2000L)
//                .buyer(member)
//                .menuList(Arrays.asList(menu, menu, menu))
//                .paid(true)
//                .paymentType(PaymentType.POINT)
//                .build();
//
//        ordersAddRequest = new OrdersAddRequest();
//        ordersAddRequest.setMenuIdList(menuIdList);
//        ordersAddRequest.setPaymentType(orders.getPaymentType());
//        ordersAddRequest.setPaid(orders.isPaid());
//
//        //when
//        Mockito.when(menuRepository.findByIdAndDeletedFalse(any())).thenReturn(Optional.of(menu));
//        Mockito.when(ordersRepository.save(orders)).thenReturn(orders);
////        orders.setId(1L);
//
//        //then
//        ordersService.makeOrder(ordersAddRequest);
//        //        assertThat(ordersService.makeOrder(ordersAddRequest)).isEqualTo(ordersResponse);
//    }

    @Test
    public void 카테고리별주문조회_전체() {
        String category = "ALL";

        Mockito.when(ordersRepository.findAll(pageable)).thenReturn(ordersCategoryResponse);

        assertThat(ordersService.getOrdersByCategory(pageable, category)).isEqualTo(ordersCategoryResponse);
    }

    @Test
    public void 카테고리별주문조회_결제완료() {
        String category = "PAID_TRUE";

        Mockito.when(ordersRepository.findAllByPaidTrue(pageable)).thenReturn(ordersCategoryResponse);

        assertThat(ordersService.getOrdersByCategory(pageable, category)).isEqualTo(ordersCategoryResponse);
    }

    @Test
    public void 카테고리별주문조회_미결제() {
        String category = "PAID_FALSE";

        Mockito.when(ordersRepository.findAllByPaidFalse(pageable)).thenReturn(ordersCategoryResponse);

        assertThat(ordersService.getOrdersByCategory(pageable, category)).isEqualTo(ordersCategoryResponse);
    }

    @Test
    public void 카테고리별주문조회_제작완료() {
        String category = "MADE_TRUE";

        Mockito.when(ordersRepository.findAllByMadeTrue(pageable)).thenReturn(ordersCategoryResponse);

        assertThat(ordersService.getOrdersByCategory(pageable, category)).isEqualTo(ordersCategoryResponse);
    }

    @Test
    public void 카테고리별주문조회_픽업완료() {
        String category = "PICKUP_FALSE";

        Mockito.when(ordersRepository.findAllByPickupFalse(pageable)).thenReturn(ordersCategoryResponse);

        assertThat(ordersService.getOrdersByCategory(pageable, category)).isEqualTo(ordersCategoryResponse);
    }

    @Test
    public void 주문상태변경() {
        OrdersUpdateRequest ordersUpdateRequest = new OrdersUpdateRequest();
        ordersService.updateOrder(ordersUpdateRequest);
    }

}