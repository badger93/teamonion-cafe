package com.teamonion.tmong.member;

import com.teamonion.tmong.exception.ValidExceptionType;
import com.teamonion.tmong.exception.ValidCustomException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Setter
@Getter
public class MemberSignUpRequest {

    @NotBlank(message = "아이디를 입력해주세요")
    private String memberId;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$", message = "8~16자리의 영문, 숫자 조합이어야 합니다")
    private String password;

    private String passwordCheck;

    private boolean isValidPassword() {
        if (password == null) {
            return false;
        }
        return password.equals(passwordCheck);
    }

    public Member toEntity() {
        if(!isValidPassword()) {
            throw new ValidCustomException(ValidExceptionType.PASSWORD_MISMATCH);
        }
        return Member.builder()
                .memberId(memberId)
                .password(password)
                .build();
    }
}
