package priv.yp.town.bigdata.util;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class JSONUtil {

    public static JSONObject readJsonFile(File jsonFile) {
        try {
            FileReader fileReader = new FileReader(jsonFile);
            Reader reader = new InputStreamReader(new FileInputStream(jsonFile), StandardCharsets.UTF_8);
            int ch;
            StringBuilder sb = new StringBuilder();
            while ((ch = reader.read()) != -1) {
                sb.append((char) ch);
            }
            fileReader.close();
            reader.close();
            return (JSONObject) new JSONParser(JSONParser.MODE_JSON_SIMPLE).parse(sb.toString());
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return null;
        }
    }


    public static JSONObject readJsonFile(InputStream is) {
        try {
            Reader reader = new InputStreamReader(is, StandardCharsets.UTF_8);
            int ch;
            StringBuilder sb = new StringBuilder();
            while ((ch = reader.read()) != -1) {
                sb.append((char) ch);
            }
            reader.close();
            return (JSONObject) new JSONParser(JSONParser.MODE_JSON_SIMPLE).parse(sb.toString());
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}
