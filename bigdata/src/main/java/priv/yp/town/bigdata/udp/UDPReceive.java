package priv.yp.town.bigdata.udp;

import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import priv.yp.town.bigdata.ws.YearWebSocket;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;

@Slf4j
public class UDPReceive implements Runnable {
    private final DatagramSocket socket;

    public UDPReceive(DatagramSocket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        while (true) {
            byte[] buffer = new byte[1024];
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
            try {
                socket.receive(packet);
            } catch (IOException e) {
                e.printStackTrace();
            }
            String receiveData = new String(packet.getData(), 0, packet.getLength());
            log.info("UDP接收到数据：{}", receiveData);

            YearWebSocket socket = new YearWebSocket();
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("data", receiveData);
            socket.onMessage(jsonObject.toJSONString());

        }
    }
}
