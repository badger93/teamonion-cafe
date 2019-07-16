package com.teamonion.tmong.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberSignUpRequestDto {

    @NotBlank(message = "아이디를 입력해주세요")
    private String memberId;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$", message = "8~16자리의 영문, 숫자 조합이어야 합니다")
    private String password;

    public Member toEntity() {
        return Member.builder()
                .memberId(memberId)
                .password(password)
                .build();
    }
}
