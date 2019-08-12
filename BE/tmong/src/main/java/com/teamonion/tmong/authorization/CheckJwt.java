package com.teamonion.tmong.authorization;

import com.teamonion.tmong.member.MemberRole;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CheckJwt {
    MemberRole role() default MemberRole.NORMAL;
}
