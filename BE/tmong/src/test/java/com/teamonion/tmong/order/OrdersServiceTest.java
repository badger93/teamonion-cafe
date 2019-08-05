package com.teamonion.tmong.order;

import com.teamonion.tmong.member.MemberService;
import com.teamonion.tmong.menu.Menu;
import com.teamonion.tmong.menu.MenuRepository;
import com.teamonion.tmong.security.JwtComponent;
import org.hibernate.criterion.Order;
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

//    @Test
//    public void 주문진행() {
//        OrdersAddRequest ordersAddRequest = new OrdersAddRequest();
//        ordersAddRequest.setMenuIdList(Arrays.asList(1L, 2L, 3L));
//
//        Menu menu = new Menu();
//        Orders orders;
//
//        MemberSignUpRequest memberSignUpRequest = new MemberSignUpRequest();
//        memberSignUpRequest.setMemberId("memberId");
//        memberSignUpRequest.setPassword("password123");
//        memberSignUpRequest.setPasswordCheck("password123");
//        Member member = memberSignUpRequest.toEntity();
//
//        orders = ordersAddRequest.toEntity(3000, member, Arrays.asList(menu, menu));
//        orders.setId(1L);
//
//        Mockito.when(menuRepository.findByIdAndDeletedFalse(any())).thenReturn(Optional.of(menu));
//        Mockito.when(memberService.findByMemberId(any())).thenReturn(member);
//        Mockito.when(ordersRepository.save(orders)).thenReturn(orders);
//
//        ordersService.makeOrder(ordersAddRequest);
//    }

    private Orders orders;
    private OrdersAddRequest ordersAddRequest;
    private Pageable pageable;
    private Page<Orders> ordersCategoryResponse;

    @Before
    public void setUp() {
        pageable = PageRequest.of(0, 20);

        List<Orders> list = new ArrayList<>();
        ordersCategoryResponse = new PageImpl<>(list);
    }

//    @Test
//    public void 주문진행() {
//        List<Long> menuIdList = Arrays.asList(1L,2L,3L);
//
//        ordersAddRequest = new OrdersAddRequest();
//        ordersAddRequest.setMenuIdList(menuIdList);
//        ordersAddRequest.setPaymentType(PaymentType.POINT);
//        ordersAddRequest.setPaid(true);
//
//        Menu menu = new Menu();
//        orders = new Orders();
//        orders.setId(1L);
//
////        OrdersResponse ordersResponse = new OrdersResponse(orders);
//
//        Mockito.when(menuRepository.findByIdAndDeletedFalse(any())).thenReturn(Optional.of(menu));
//        Mockito.when(ordersRepository.save(orders)).thenReturn(orders);
//
//        ordersService.makeOrder(ordersAddRequest);
////        assertThat(ordersService.makeOrder(ordersAddRequest)).isEqualTo(ordersResponse);
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

}