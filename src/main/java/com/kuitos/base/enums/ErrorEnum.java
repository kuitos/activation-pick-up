package com.kuitos.base.enums;

/**
 * Author: kui.liu
 * Date: 14-3-16
 * Time: 下午8:27
 */
public enum ErrorEnum {

    SYSTEM_RESULT_ERROR("SYSTEM_RESULT_ERROR", "SYSTEM", "系统出错");



    private String errorCode;
    private String errorType;
    private String message;

    private ErrorEnum(String errorCode, String errorType, String message) {
        this.errorCode = errorCode;
        this.errorType = errorType;
        this.message = message;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorType() {
        return errorType;
    }

    public void setErrorType(String errorType) {
        this.errorType = errorType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
