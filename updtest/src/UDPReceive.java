import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class UDPReceive implements Runnable {
    private DatagramSocket socket;

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
            System.out.println(receiveData);

        }
    }
}
