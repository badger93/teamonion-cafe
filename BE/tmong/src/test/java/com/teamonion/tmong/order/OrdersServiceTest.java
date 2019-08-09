package com.teamonion.tmong.order;

import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.member.MemberRepository;
import com.teamonion.tmong.member.MemberService;
import com.teamonion.tmong.menu.Menu;
import com.teamonion.tmong.menu.MenuService;
import com.teamonion.tmong.security.JwtComponent;
import com.teamonion.tmong.statistics.StatisticsRepository;
import com.teamonion.tmong.statistics.StatisticsService;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;

@RunWith(MockitoJUnitRunner.class)
public class OrdersServiceTest {

    @Mock
    OrdersRepository ordersRepository;

    @Mock
    MenuService menuService;

    @Mock
    MemberRepository memberRepository;

    @Mock
    MemberService memberService;

    @Mock
    PointService pointService;

    @Mock
    JwtComponent jwtComponent;

    @Mock
    StatisticsService statisticsService;

    @Mock
    StatisticsRepository statisticsRepository;

    @Autowired
    TestRestTemplate template;

    @InjectMocks
    OrdersService ordersService;

    private Pageable pageable;
    private Page<Orders> ordersCategoryResponse;
    private Orders orders;
    private OrdersAddRequest ordersAddRequest;
    private Member member;
    private OrdersResponse ordersResponse;

    @Before
    public void setUp() {
        pageable = PageRequest.of(0, 20);
        List<Orders> list = new ArrayList<>();
        ordersCategoryResponse = new PageImpl<>(list);

        ordersAddRequest = new OrdersAddRequest();

        member = Member.builder()
                .memberId("onion")
                .password("123456789a")
                .build();
    }

    @Test
    public void 주문진행() {
        //given
        List<Long> menuIdList = Arrays.asList(1L, 2L, 3L);
        ordersAddRequest.setMenuIdList(menuIdList);
        ordersAddRequest.setPaymentType(PaymentType.POINT);
        ordersAddRequest.setPaid(true);

        Menu menu = Menu.builder()
                .price(1000L)
                .build();

        orders = Orders.builder()
                .paymentType(PaymentType.POINT)
                .amount(2000L)
                .buyer(member)
                .menuList(Arrays.asList(menu, menu, menu))
                .paid(true)
                .build();

        ordersResponse = new OrdersResponse(orders);

        //when
        Mockito.when(jwtComponent.getClaimValueByToken(any())).thenReturn(member.getMemberId());
        Mockito.when(memberService.findByMemberId(any())).thenReturn(member);
        Mockito.when(ordersRepository.save(any())).thenReturn(orders);

        //then
        OrdersResponse response = ordersService.makeOrder(ordersAddRequest);

        assertThat(response.getBuyerId()).isEqualTo(ordersResponse.getBuyerId());
        assertThat(response.getAmount()).isEqualTo(ordersResponse.getAmount());
        assertThat(response.getPaymentType()).isEqualTo(ordersResponse.getPaymentType());
        assertThat(response.getCreatedDate()).isEqualTo(ordersResponse.getCreatedDate());
        assertThat(response.getMenuNameList()).isEqualTo(ordersResponse.getMenuNameList());
    }

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