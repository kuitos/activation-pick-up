package com.kuitos.base.controllers.base;

import com.kuitos.base.consts.SystemConst;
import com.kuitos.base.enums.ErrorEnum;
import com.kuitos.base.exceptions.ActivationException;
import com.kuitos.base.exceptions.ActivationRuntimeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * controller基类
 *
 * @author jons.shi
 *         2014-1-9
 */

public class BaseController {

    protected static Logger logger = LoggerFactory.getLogger(BaseController.class);

    /**
     * 生成返回Map
     *
     * @param data
     * @param errEnum
     * @return
     */
    protected Map<String, Object> genResultMapper(Object data, ErrorEnum errEnum) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("data", data);
        if (errEnum != null) {
            resultMap.put("errCode", errEnum.getErrorCode());
            resultMap.put("message", errEnum.getMessage());
            resultMap.put("status", SystemConst.RESULT_STATUS_FAILED);
        } else {
            resultMap.put("status", SystemConst.RESULT_STATUS_SUCCESS);
        }
        if (resultMap.toString().length() > 250) {
            logger.info((new StringBuilder("--result:")).append(resultMap.toString().substring(0, 250)).append("...").toString());
        } else {
            logger.info((new StringBuilder("--result:")).append(resultMap).toString());
        }
        return resultMap;
    }

    /**
     * 返回error
     *
     * @param errCode
     * @param message
     * @return
     */
    protected Map<String, Object> genResultError(String errCode, String message) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("data", null);
        resultMap.put("errCode", errCode);
        resultMap.put("message", message);
        resultMap.put("status", SystemConst.RESULT_STATUS_FAILED);
        logger.info((new StringBuilder("--result:")).append(resultMap).toString());
        return resultMap;
    }

    /**
     * 无法处理的异常，生成异常对应的错误返回
     *
     * @param e
     * @return
     */
    protected Map<String, Object> genResultByException(Exception e) {
        ErrorEnum error = null;
        logger.error("Exception:" + e.getMessage(), e);
        if (e instanceof ActivationException) {
            error = ((ActivationException) e).getErrorEnum();
        }
        if (e instanceof ActivationRuntimeException) {
            error = ((ActivationRuntimeException) e).getErrorEnum();
        }
        if (error != null) {
            logger.error("Exception Info --code:" + error.getErrorCode() + ",type:" + error.getErrorType() + ",message:" + error.getMessage());
            return genResultMapper(null, error);
        }
        return genResultMapper(null, ErrorEnum.SYSTEM_RESULT_ERROR);
    }

}
