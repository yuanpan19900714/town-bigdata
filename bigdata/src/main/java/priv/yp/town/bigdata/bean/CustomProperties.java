package priv.yp.town.bigdata.bean;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Data
public class CustomProperties {
    @Value("${effectiveYears}")
    private String effectiveYears;
    @Value("${udpPort}")
    private String udpPort;

    @Override
    public String toString() {
        return "CustomProperties{" +
                "effectiveYears='" + effectiveYears + '\'' +
                '}';
    }
}
