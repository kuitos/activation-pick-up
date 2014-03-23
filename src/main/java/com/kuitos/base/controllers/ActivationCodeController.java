package com.kuitos.base.controllers;

import com.kuitos.base.beans.request.ActivationCodeVo;
import com.kuitos.base.beans.request.ContactInfoVo;
import com.kuitos.base.controllers.base.BaseController;
import com.kuitos.base.services.ActivationCodeService;
import com.kuitos.base.utils.SerialNumberUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Author: kui.liu
 * Date: 14-3-16
 * Time: 下午8:00
 */
@Controller
@RequestMapping("ctrl/activationCode")
public class ActivationCodeController extends BaseController {

    @Resource
    private ActivationCodeService activationCodeService;

    /**
     * 按数量生成序列号
     *
     * @param amount
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "genActivationCode", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public String genActivationCode(@RequestParam int amount) {
        int startNum = activationCodeService.getMaxSerialNumber();
        logger.debug("当前最大序列号为：" + startNum);
        List<Map<String, Object>> codesList = SerialNumberUtil.batchGenSerialCode(startNum, amount);
        activationCodeService.genActivationCodes(codesList);
        return "生成成功!";
    }

    /**
     * 查询序列号
     *
     * @param activationCodeVo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "getActivationCode", method = RequestMethod.POST)
    public Map<String, Object> getActivationCodes(@RequestBody ActivationCodeVo activationCodeVo) {
        Map<String, Object> result = new HashMap<>();
        try {
            List<Map<String, Object>> codeList = activationCodeService.getActivationCodes(activationCodeVo);
            result.put("dataList", codeList);
            activationCodeVo.setTotalItem(activationCodeService.countActivationCodes(activationCodeVo));
            result.put("currentPage", activationCodeVo.getCurrentPage());
            result.put("pageSize", activationCodeVo.getPageSize());
            result.put("total", activationCodeVo.getTotalItem());
            result.put("totalPages", activationCodeVo.getTotalPage());
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            return genResultByException(ex);
        }
        return genResultMapper(result, null);
    }

    /**
     * 激活序列号
     *
     * @param pkid
     * @param activationType
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "activateCode", method = RequestMethod.GET)
    public String activateCode(@RequestParam int pkid, @RequestParam int activationType) {
        Map<String, Integer> paraMap = new HashMap<>();
        paraMap.put("pkid", pkid);
        paraMap.put("activationType", activationType);
        activationCodeService.activateCode(paraMap);
        return "激活成功!";
    }

    /**
     * 获取联系人信息
     *
     * @param activationCodeVo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "getActivationCodeInfo", method = RequestMethod.POST)
    public Map<String, Object> getActivationCodeInfo(@RequestBody ActivationCodeVo activationCodeVo) {
        Map<String, Object> result = new HashMap<>();
        try {
            List<Map<String, Object>> codeList = activationCodeService.getActivationCodeInfo(activationCodeVo);
            result.put("dataList", codeList);
            activationCodeVo.setTotalItem(activationCodeService.countActivationCodeInfo(activationCodeVo));
            result.put("currentPage", activationCodeVo.getCurrentPage());
            result.put("pageSize", activationCodeVo.getPageSize());
            result.put("total", activationCodeVo.getTotalItem());
            result.put("totalPages", activationCodeVo.getTotalPage());
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            return genResultByException(ex);
        }
        return genResultMapper(result, null);
    }

    /**
     * 添加发货信息
     *
     * @param contactInfoVo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "deliverGoods", method = RequestMethod.POST)
    public String deliverGoods(@RequestBody ContactInfoVo contactInfoVo) {
        activationCodeService.deliverGoods(contactInfoVo);
        return "发货成功!";
    }

    /**
     * 修改发货信息
     *
     * @param contactInfoVo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "updateContactInfo", method = RequestMethod.POST)
    public String updateContactInfo(@RequestBody ContactInfoVo contactInfoVo) {
        activationCodeService.updateContactInfo(contactInfoVo);
        return "修改成功!";
    }
}