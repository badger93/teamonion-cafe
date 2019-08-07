package com.teamonion.tmong.validate;

import com.teamonion.tmong.order.OrdersUpdateRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UpdateOrderValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return OrdersUpdateRequest.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object requestObject, Errors errors) {
        OrdersUpdateRequest ordersUpdateRequest = (OrdersUpdateRequest) requestObject;

        if(ordersUpdateRequest.getId() == null){
            errors.rejectValue("orderId", "주문 번호 정보가 옳바르지 않습니다");
        }
        if(ordersUpdateRequest.getBuyerId() == null) {
            errors.rejectValue("buyerId", "주문자 번호 정보가 옳바르지 않습니다");
        }
        // TODO : 다른 예외처리 무엇이 있을까요 !!!!

    }
}
