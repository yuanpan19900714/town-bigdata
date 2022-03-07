package priv.yp.town.bigdata.util;

import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;

@Slf4j
@Component
public class DataGenerator {
    private static final String[] DATA_RANGE = {"person", "enterprise", "project"};
    private static final String TARGET_DATA_NAME = "detail";

    public static JSONObject generateData(int year, String effectiveYears, String type) {
        JSONObject jsonObject = new JSONObject();
        String[] effectiveYearsArr = effectiveYears.split(",");
        int firstYear = LocalDate.now().getYear();
        int len = effectiveYearsArr.length;
        if (len > 0) {
            firstYear = Integer.parseInt(effectiveYearsArr[0]);
        } else {
            log.error("参数[effectiveYears]没有值！");
        }
        JSONArray datas = getYearDatas(year, type);
        String dataTag = getDataTag(type);

        jsonObject.put("year", year);
        jsonObject.put("type", type);
        JSONArray targetDatas = new JSONArray();
        JSONObject lastMonthDataObject = getLastMonthData(year, firstYear, type, dataTag);
        targetDatas.appendElement(lastMonthDataObject);
        for (Object object : datas) {
            JSONObject monthDataObject = (JSONObject) object;
            JSONArray monthDatas = (JSONArray) monthDataObject.get("data");
            String monthStr = monthDataObject.getAsString("month");
            JSONObject targetDataObject = new JSONObject();
            makeTargetData(monthStr, monthDatas, dataTag, targetDataObject);
            targetDatas.appendElement(targetDataObject);
        }
        jsonObject.put("datas", targetDatas);
        log.info("生成数据{}", jsonObject);
        return jsonObject;
    }

    private static void makeTargetData(String monthStr, JSONArray monthDatas, String dataTag, JSONObject targetDataObject) {
        targetDataObject.put("month", monthStr);
        for (Object object1 : monthDatas) {
            JSONObject dataObject = (JSONObject) object1;
            if (dataTag.equalsIgnoreCase(dataObject.getAsString("tag"))) {
                JSONObject targetData = (JSONObject) dataObject.get(TARGET_DATA_NAME);
                targetDataObject.put("data", targetData);
            }
        }
    }

    private static String getDataTag(String type) {
        String dataTag = "";
        for (String dataType : DATA_RANGE) {
            if (type.startsWith(dataType)) {
                dataTag = type.replaceAll(dataType, "");
            }
        }
        return dataTag;
    }

    private static JSONArray getYearDatas(int year, String type) {
        JSONArray datas = new JSONArray();
        String resourceName = "";
        String dataId = "";
        for (String dataType : DATA_RANGE) {
            if (type.startsWith(dataType)) {
                dataId = dataType + "-" + year;
                resourceName = "templates" + File.separator + dataType + "-" + year + ".json";
            }
        }
        //File file = null;
        InputStream is = null;
        try {
//            file = new ClassPathResource(resourceName).getFile();
//            file = ResourceUtils.getFile("classpath:" + resourceName);
            is = new ClassPathResource(resourceName).getInputStream();
        } catch (FileNotFoundException e) {
            log.error("文件{}路径有误！", resourceName);
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

//        JSONObject data = JSONUtil.readJsonFile(file);
        JSONObject data = JSONUtil.readJsonFile(is);
        if (data == null) {
            log.error("文件{}为空！", resourceName);
            return datas;
        }
        String id = data.getAsString("id");
        if (!dataId.equalsIgnoreCase(id)) {
            log.error("文件{}内容有误！", resourceName);
            return datas;
        }
        datas = (JSONArray) data.get("datas");
        log.info("读文件{}", resourceName);
        return datas;
    }

    private static JSONObject getLastMonthData(int year, int firstYear, String type, String dataTag) {
        JSONObject jsonObject = new JSONObject();
        JSONArray datas;
        String yearStr, monthStr;
        if (year == firstYear) {
            datas = getYearDatas(year, type);
            yearStr = year + "";
            monthStr = "01";
        } else {
            datas = getYearDatas(year - 1, type);
            yearStr = year - 1 + "";
            monthStr = "12";
        }
        for (Object object : datas) {
            JSONObject monthDataObject = (JSONObject) object;
            JSONArray monthDatas = (JSONArray) monthDataObject.get("data");
            String month = monthDataObject.getAsString("month");
            if (month.equalsIgnoreCase(yearStr + monthStr)) {
                makeTargetData(month, monthDatas, dataTag, jsonObject);
            }
        }
        return jsonObject;
    }
}
