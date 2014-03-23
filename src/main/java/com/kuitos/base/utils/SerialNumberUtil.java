package com.kuitos.base.utils;

import java.util.*;

/**
 * Author: kui.liu
 * Date: 14-3-16
 * Time: 下午8:06
 */
public class SerialNumberUtil {

    /**
     * 自定义进制(0,1没有加入,容易与o,l混淆)
     */
    private static final char[] baseArray = new char[]{'q', 'w', 'e', '8', '2', 'x', 'c', 'p', 'o', '9', '7', 'i', 'k', 'm', 'j', '5', 'y', 't', '3', '4', '6', 'n'};
    /**
     * 自动补全组(不能与自定义进制有重复)
     */
    private static final char[] completeArray = new char[]{'a', 's', 'd', 'z', 'u', 'f', 'r', 'v', 'b', 'g', 'h'};
    /**
     * 进制长度
     */
    private static final int length = baseArray.length;
    /**
     * 序列最小长度
     */
    private static final int minLength = 8;

    /**
     * 根据ID生成六位随机码
     *
     * @param num ID
     * @return 随机码
     */
    public static String genSerialNumber(long num) {
        char[] buf = new char[32];
        int charPos = 32;
        while ((num / length) > 0) {
            buf[--charPos] = baseArray[(int) (num % length)];
            num /= length;
        }
        buf[--charPos] = baseArray[(int) (num % length)];
        String str = new String(buf, charPos, (32 - charPos));
        //不够长度的自动随机补全
        if (str.length() < minLength) {
            StringBuffer sb = new StringBuffer();
            Random rnd = new Random();
            for (int i = 0; i < minLength - str.length(); i++) {
                sb.append(completeArray[rnd.nextInt(11)]);
            }
            str += sb.toString();
        }
        return str;
    }

    public static List<Map<String, Object>> batchGenSerialCode(int startCode, int amount) {

        List<Map<String, Object>> codesList = new ArrayList<>();
        for (int i = 0; i < amount; i++) {
            Map<String, Object> codeMap = new HashMap<>();
            String code = genSerialNumber(i + startCode);
            codeMap.put("number", startCode++);
            codeMap.put("code", code);
            codesList.add(codeMap);
        }
        if (codesList.size() != amount) {
            return null;
        }
        return codesList;
    }

    public static void main(String[] args) {
        System.out.println(batchGenSerialCode(1, 100));
    }
}

