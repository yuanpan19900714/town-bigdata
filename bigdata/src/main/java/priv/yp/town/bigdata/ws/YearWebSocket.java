package priv.yp.town.bigdata.ws;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import priv.yp.town.bigdata.bean.CustomProperties;
import priv.yp.town.bigdata.util.DataCache;
import priv.yp.town.bigdata.util.DataGenerator;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.Arrays;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Component
@Slf4j
@Data
@ServerEndpoint("/websocket/year")
public class YearWebSocket {
    private static int onlineCount = 0;
    private static Map<String, YearWebSocket> clients = new ConcurrentHashMap<>();
    private Session session;

    /**
     * ServerEndpoint 注解的类不能使用 Autowired 自动注入引用的类
     * 必须添加静态类属性，然后自动注入其 set 方法
     */
    private static CustomProperties customProperties;

    @Autowired
    public void setCustomProperties(CustomProperties properties) {
        YearWebSocket.customProperties = properties;
    }

    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
        clients.put(session.getId(), this);
        addOnlineCount();
        log.info("WebSocket已连接，id：{}", session.getId());
    }

    @OnMessage
    public void onMessage(String msg) {
        String effectiveYears = customProperties.getEffectiveYears();
        String[] effectiveYearsArr = effectiveYears.split(",");

        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject = (JSONObject) new JSONParser(JSONParser.MODE_JSON_SIMPLE).parse(msg);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        String data = jsonObject.getAsString("data");
        if (Arrays.asList(effectiveYearsArr).contains(data)) {
            int year = Integer.parseInt(data);
            if (!DataCache.personTotalDataMap.containsKey(year)) {
                DataCache.personTotalDataMap.put(year, DataGenerator.generateData(year, effectiveYears, "personTotal"));
            }
            if (!DataCache.personAddedDataMap.containsKey(year)) {
                DataCache.personAddedDataMap.put(year, DataGenerator.generateData(year, effectiveYears, "personAdded"));
            }
            if (!DataCache.personLeavedDataMap.containsKey(year)) {
                DataCache.personLeavedDataMap.put(year, DataGenerator.generateData(year, effectiveYears, "personLeaved"));
            }

            if (!DataCache.enterpriseTotalDataMap.containsKey(year)) {
                DataCache.enterpriseTotalDataMap.put(year, DataGenerator.generateData(year, effectiveYears, "enterpriseTotal"));
            }
            if (!DataCache.enterpriseInnovateDataMap.containsKey(year)) {
                DataCache.enterpriseInnovateDataMap.put(year, DataGenerator.generateData(year, effectiveYears, "enterpriseInnovate"));
            }
            if (!DataCache.enterpriseDistributionDataMap.containsKey(year)) {
                DataCache.enterpriseDistributionDataMap.put(year, DataGenerator.generateData(year, effectiveYears, "enterpriseDistribution"));
            }
            if (!DataCache.enterpriseDevelopDataMap.containsKey(year)) {
                DataCache.enterpriseDevelopDataMap.put(year, DataGenerator.generateData(year, effectiveYears, "enterpriseDevelop"));
            }

            if (!DataCache.projectApplyDataMap.containsKey(year)) {
                DataCache.projectApplyDataMap.put(year, DataGenerator.generateData(year, effectiveYears, "projectApply"));
            }
            if (!DataCache.projectSupportDataMap.containsKey(year)) {
                DataCache.projectSupportDataMap.put(year, DataGenerator.generateData(year, effectiveYears, "projectSupport"));
            }
            if (!DataCache.projectCostDataMap.containsKey(year)) {
                DataCache.projectCostDataMap.put(year, DataGenerator.generateData(year, effectiveYears, "projectCost"));
            }
            if (!DataCache.projectClosedDataMap.containsKey(year)) {
                DataCache.projectClosedDataMap.put(year, DataGenerator.generateData(year, effectiveYears, "projectClosed"));
            }
            log.info("发送数据：{}", data);
            sendMessage(data);
        } else {
            log.error("数据 {} 不在合法范围{}内", data, Arrays.toString(effectiveYearsArr));
        }
    }


    @OnClose
    public void onClose() {
        clients.remove(session.getId());
        subOnlineCount();
    }


    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }


    public void sendMessage(String message) {
        for (YearWebSocket item : clients.values()) {
            item.session.getAsyncRemote().sendText(message);
        }
    }

    public static synchronized void addOnlineCount() {
        YearWebSocket.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        YearWebSocket.onlineCount--;
    }


}
