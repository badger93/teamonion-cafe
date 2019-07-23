package com.teamonion.tmong.order;

import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.member.MemberRepository;
import com.teamonion.tmong.menu.Menu;
import com.teamonion.tmong.menu.MenuController;
import com.teamonion.tmong.menu.MenuRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrdersService {
    private static Logger log = LoggerFactory.getLogger(MenuController.class);

    private final OrdersRepository ordersRepository;

    public OrdersService(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    MemberRepository memberRepository;

    public void add(OrdersAddRequest ordersAddRequest) {
        // TODO : 총 금액 계산
        // TODO : 주문자 정보
        // TODO : 메뉴 정보

        Member member = memberRepository.findById(ordersAddRequest.getMember_id()).get();

        // 총 금액 가격 음음음 타입 음음
        Double amount = 0.0;

        List<Menu> menuList = new ArrayList<>();
        // TODO : isPresent()를 하지 않고 get()을 한다.....는 것은 안좋은것인가...
        // 림다식 내의 변수 사용 불가능
        //menuList.forEach(e -> amount+=Double.valueOf(e.getPrice()));

        // 방법 1
        ordersAddRequest.getMenuIdList()
                .forEach(e -> menuList.add(menuRepository.findById(e).get()));

        for (Menu menu : menuList) {
            amount += Double.valueOf(menu.getPrice());
        }

        // 방법 2
        for (Long id : ordersAddRequest.getMenuIdList()) {
            Menu menu = menuRepository.findById(id).get();
            menuList.add(menu);
            amount += Double.valueOf(menu.getPrice());
        }

        log.info("총 가격 : {}", amount);


        //ordersRepository.save(ordersAddRequest.toEntity());
    }

}
