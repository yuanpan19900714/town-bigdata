import java.net.DatagramSocket;
import java.net.SocketException;

public class UDPTest {
    public static void main(String[] args) {
        try {
            DatagramSocket clientSocket = new DatagramSocket(10004);
//            DatagramSocket serverSocket = new DatagramSocket(30000);
            new Thread(new UDPSend(clientSocket)).start();
//            new Thread(new UDPReceive(serverSocket)).start();
        } catch (SocketException e) {
            e.printStackTrace();
        }
    }
}
