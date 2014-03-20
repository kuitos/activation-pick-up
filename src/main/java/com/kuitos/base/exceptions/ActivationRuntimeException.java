package com.kuitos.base.exceptions;

import com.kuitos.base.enums.ErrorEnum;

/**
 * Author: kui.liu
 * Date: 14-3-16
 * Time: 下午10:52
 */
public class ActivationRuntimeException extends RuntimeException {

    /**
     *
     */
    private static final long serialVersionUID = -8913894052239650725L;

    /**
     * 异常信息 *
     */
    private String msg;

    /**
     * 异常错误enum *
     */
    private ErrorEnum errorEnum;

    public ActivationRuntimeException(String msg) {
        super();
        this.msg = msg;
    }

    public ActivationRuntimeException(String msg, ErrorEnum errorEnum) {
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
