package com.teamonion.tmong.order;

import com.teamonion.tmong.member.Member;
import com.teamonion.tmong.menu.Menu;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    @Column(nullable = false)
    private long amount;

    private LocalDateTime createdDate;

    @ManyToOne
    private Member buyer;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Menu> menuList = new ArrayList<>();

    @Column(nullable = false)
    private boolean paid;

    private boolean made = false;

    private boolean pickup = false;

    @Builder
    public Orders(PaymentType paymentType, long amount, Member buyer, List<Menu> menuList, boolean paid){
        this.paymentType = paymentType;
        this.amount = amount;
        this.createdDate = LocalDateTime.now();
        this.buyer = buyer;
        this.menuList = menuList;
        this.paid = paid;
        this.made = false;
        this.pickup = false;
    }

    public void pay() {
        this.paid = true;
    }

    public void make() {
        this.made = true;
    }

    public void pick() {
        this.pickup = true;
    }
}
