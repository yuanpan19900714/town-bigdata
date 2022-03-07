package priv.yp.town.bigdata.util;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import priv.yp.town.bigdata.bean.CustomProperties;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Component
public class DataCache {
    public static Map<Integer, JSONObject> personTotalDataMap = new HashMap<>();
    public static Map<Integer, JSONObject> personAddedDataMap = new HashMap<>();
    public static Map<Integer, JSONObject> personLeavedDataMap = new HashMap<>();
    public static Map<Integer, JSONObject> enterpriseTotalDataMap = new HashMap<>();
    public static Map<Integer, JSONObject> enterpriseInnovateDataMap = new HashMap<>();
    public static Map<Integer, JSONObject> enterpriseDistributionDataMap = new HashMap<>();
    public static Map<Integer, JSONObject> enterpriseDevelopDataMap = new HashMap<>();
    public static Map<Integer, JSONObject> projectApplyDataMap = new HashMap<>();
    public static Map<Integer, JSONObject> projectSupportDataMap = new HashMap<>();
    public static Map<Integer, JSONObject> projectCostDataMap = new HashMap<>();
    public static Map<Integer, JSONObject> projectClosedDataMap = new HashMap<>();
    @Autowired
    private CustomProperties properties;

    @PostConstruct
    public void init() {
        int year = LocalDate.now().getYear();
        if (!DataCache.personTotalDataMap.containsKey(year)) {
            JSONObject jsonObject = DataGenerator.generateData(year, properties.getEffectiveYears(), "personTotal");
            DataCache.personTotalDataMap.put(year, jsonObject);
        }
        if (!DataCache.personAddedDataMap.containsKey(year)) {
            JSONObject jsonObject = DataGenerator.generateData(year, properties.getEffectiveYears(), "personAdded");
            DataCache.personAddedDataMap.put(year, jsonObject);
        }
        if (!DataCache.personLeavedDataMap.containsKey(year)) {
            JSONObject jsonObject = DataGenerator.generateData(year, properties.getEffectiveYears(), "personLeaved");
            DataCache.personLeavedDataMap.put(year, jsonObject);
        }

        if (!DataCache.enterpriseTotalDataMap.containsKey(year)) {
            JSONObject jsonObject = DataGenerator.generateData(year, properties.getEffectiveYears(), "enterpriseTotal");
            DataCache.enterpriseTotalDataMap.put(year, jsonObject);
        }
        if (!DataCache.enterpriseInnovateDataMap.containsKey(year)) {
            JSONObject jsonObject = DataGenerator.generateData(year, properties.getEffectiveYears(), "enterpriseInnovate");
            DataCache.enterpriseInnovateDataMap.put(year, jsonObject);
        }
        if (!DataCache.enterpriseDistributionDataMap.containsKey(year)) {
            JSONObject jsonObject = DataGenerator.generateData(year, properties.getEffectiveYears(), "enterpriseDistribution");
            DataCache.enterpriseDistributionDataMap.put(year, jsonObject);
        }
        if (!DataCache.enterpriseDevelopDataMap.containsKey(year)) {
            JSONObject jsonObject = DataGenerator.generateData(year, properties.getEffectiveYears(), "enterpriseDevelop");
            DataCache.enterpriseDevelopDataMap.put(year, jsonObject);
        }

        if (!DataCache.projectApplyDataMap.containsKey(year)) {
            JSONObject jsonObject = DataGenerator.generateData(year, properties.getEffectiveYears(), "projectApply");
            DataCache.projectApplyDataMap.put(year, jsonObject);
        }
        if (!DataCache.projectSupportDataMap.containsKey(year)) {
            JSONObject jsonObject = DataGenerator.generateData(year, properties.getEffectiveYears(), "projectSupport");
            DataCache.projectSupportDataMap.put(year, jsonObject);
        }
        if (!DataCache.projectCostDataMap.containsKey(year)) {
            JSONObject jsonObject = DataGenerator.generateData(year, properties.getEffectiveYears(), "projectCost");
            DataCache.projectCostDataMap.put(year, jsonObject);
        }
        if (!DataCache.projectClosedDataMap.containsKey(year)) {
            JSONObject jsonObject = DataGenerator.generateData(year, properties.getEffectiveYears(), "projectClosed");
            DataCache.projectClosedDataMap.put(year, jsonObject);
        }
    }

    @PreDestroy
    public void destroy() {

    }
}
