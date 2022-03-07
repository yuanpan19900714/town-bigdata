package priv.yp.town.bigdata;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import priv.yp.town.bigdata.udp.UDPReceive;

import java.net.DatagramSocket;
import java.net.SocketException;

@SpringBootApplication
public class BigdataApplication {

    public static void main(String[] args) {
        SpringApplication.run(BigdataApplication.class, args);
        try {
            DatagramSocket serverSocket = new DatagramSocket(30000);
            new Thread(new UDPReceive(serverSocket)).start();
        } catch (SocketException e) {
            e.printStackTrace();
        }
    }

}
