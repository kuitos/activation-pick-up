package com.kuitos.base.beans.request;

import com.kuitos.base.beans.BaseQuery;

/**
 * Author: kui.liu
 * Date: 2014/3/23 0023
 * Time: 15:48
 */
public class ContactInfoVo extends BaseQuery {

    private int pkid;

    private int serialNumber;

    private String phone;

    private String address;

    private String expressNumber;

    private short shipmentStatus;

    public int getPkid() {
        return pkid;
    }

    public void setPkid(int pkid) {
        this.pkid = pkid;
    }

    public int getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(int serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getExpressNumber() {
        return expressNumber;
    }

    public void setExpressNumber(String expressNumber) {
        this.expressNumber = expressNumber;
    }

    public short getShipmentStatus() {
        return shipmentStatus;
    }

    public void setShipmentStatus(short shipmentStatus) {
        this.shipmentStatus = shipmentStatus;
    }
}
