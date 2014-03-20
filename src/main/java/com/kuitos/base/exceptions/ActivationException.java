package com.kuitos.base.exceptions;

import com.kuitos.base.enums.ErrorEnum;

/**
 * Author: kui.liu
 * Date: 14-3-16
 * Time: 下午10:48
 */
public class ActivationException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = -3519689394016067802L;

    /**
     * 异常信息 *
     */
    private String msg;

    /**
     * 异常错误enum *
     */
    private ErrorEnum errorEnum;

    public ActivationException(String msg) {
        super();
        this.msg = msg;
    }

    public ActivationException(String msg, ErrorEnum errorEnum) {
        super();
        this.msg = msg;
        this.errorEnum = errorEnum;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public ErrorEnum getErrorEnum() {
        return errorEnum;
    }

    public void setErrorEnum(ErrorEnum errorEnum) {
        this.errorEnum = errorEnum;
    }
}
