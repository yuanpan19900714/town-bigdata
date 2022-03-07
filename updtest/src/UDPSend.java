import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Scanner;

public class UDPSend implements Runnable {
    private DatagramSocket socket;

    public UDPSend(DatagramSocket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            System.out.println("-----启动UDP客户端-----");
            Scanner scanner = new Scanner(System.in);
            while (scanner.hasNext()) {
                DatagramPacket datagramPacket = new DatagramPacket(new byte[1024], 1024);
                datagramPacket.setAddress(InetAddress.getLocalHost());
                datagramPacket.setPort(30000);
                byte[] buffer = scanner.nextLine().getBytes();
                datagramPacket.setData(buffer);
                socket.send(datagramPacket);
            }
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
