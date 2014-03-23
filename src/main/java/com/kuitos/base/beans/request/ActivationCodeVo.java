package com.kuitos.base.beans.request;

import com.kuitos.base.beans.BaseQuery;

/**
 * Author: kui.liu
 * Date: 14-3-16
 * Time: 下午11:23
 */
public class ActivationCodeVo extends BaseQuery {

    // 序列号
    private String pkid;
    // 密码
    private String codePassword;
    // 激活状态
    private String status;
    // 激活类型
    private String activationType;

    public String getPkid() {
        return pkid;
    }

    public void setPkid(String pkid) {
        this.pkid = pkid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getActivationType() {
        return activationType;
    }

    public void setActivationType(String activationType) {
        this.activationType = activationType;
    }

    public String getCodePassword() {
        return codePassword;
    }

    public void setCodePassword(String codePassword) {
        this.codePassword = codePassword;
    }
}
