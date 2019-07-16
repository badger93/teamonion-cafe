package com.teamonion.tmong.member;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Setter
@Getter
@NoArgsConstructor
public class MemberSignUpRequestDto {

    @NotBlank(message = "아이디를 입력해주세요")
    private String memberId;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$", message = "8~16자리의 영문, 숫자 조합이어야 합니다")
    private String password;

    private String passwordCheck;

    public MemberSignUpRequestDto(String memberId, String password) {
        this.memberId = memberId;
        this.password = password;
    }

    @AssertTrue(message = "비밀번호가 일치하지 않습니다")
    private boolean isValidPassword() {
        if (password == null) {
            return false;
        }
        return password.equals(passwordCheck);
    }

    public void setPasswordCheck(String passwordCheck) {
        this.passwordCheck = passwordCheck;
        isValidPassword();
    }

    public Member toEntity() {
        return Member.builder()
                .memberId(memberId)
                .password(password)
                .build();
    }
}
