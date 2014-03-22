package com.kuitos.base.services;

import com.kuitos.base.beans.request.ActivationCodeVo;
import com.kuitos.base.common.MybatisDao;
import com.kuitos.base.utils.BeanUtil;
import org.apache.ibatis.annotations.Param;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import sun.management.snmp.jvmmib.EnumJvmRTBootClassPathSupport;

import javax.annotation.Resource;
import javax.swing.border.EmptyBorder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Author: kui.liu
 * Date: 14-3-16
 * Time: 下午10:36
 */
@Service
public class ActivationCodeService {

    private static Logger logger = Logger.getLogger(ActivationCodeService.class);

    @Resource
    private MybatisDao mybatisDao;

    public int getMaxSerialNumber() {
        return mybatisDao.getSingleRow("ActivationCode.getMaxSerialNumber", null);
    }

    public void genActivationCodes(List<Map<String, Object>> codesList) {
        Map<String, Object> paraMap = new HashMap<>();
        paraMap.put("codesList", codesList);
        mybatisDao.save("ActivationCode.insertActivationCode", paraMap);
    }

    public List<Map<String, Object>> getActivationCodes(ActivationCodeVo activationCodeVo) {
        return mybatisDao.getList("ActivationCode.getActivationCodes", BeanUtil.transBean2Map(activationCodeVo));
    }

    public int countActivationCodes(ActivationCodeVo activationCodeVo) {
        return mybatisDao.getSingleRow("ActivationCode.countActivationCodes", BeanUtil.transBean2Map(activationCodeVo));
    }

    public void activateCode (int pkid){
        mybatisDao.save("ActivationCode.activateCode", pkid);
    }


}
