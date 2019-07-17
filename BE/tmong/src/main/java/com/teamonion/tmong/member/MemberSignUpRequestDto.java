package com.teamonion.tmong.member;

import com.teamonion.tmong.exception.PasswordCheckNotValidException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private boolean isValidPassword() {
        if (password == null) {
            return false;
        }
        return password.equals(passwordCheck);
    }

    public Member toEntity() throws PasswordCheckNotValidException {
        if(!isValidPassword()) {
            throw new PasswordCheckNotValidException("비밀번호가 일치하지 않습니다");
        }
        return Member.builder()
                .memberId(memberId)
                .password(password)
                .build();
    }
}
