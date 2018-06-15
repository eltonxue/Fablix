import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import com.google.gson.JsonParser;
import com.google.gson.JsonObject;

public class VerifyUtils {

   public static final String SITE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

   public static boolean verify( String gRecaptchaResponse) {
       if (gRecaptchaResponse == null || gRecaptchaResponse.length() == 0) {
           return false;
       }
 
       try {
           URL verifyUrl = new URL(SITE_VERIFY_URL);

           // Open Connection to URL
           HttpsURLConnection conn = (HttpsURLConnection) verifyUrl.openConnection();

 
           // Add Request Header
           conn.setRequestMethod("POST");
           conn.setRequestProperty("User-Agent", "Mozilla/5.0");
           conn.setRequestProperty("Accept-Language", "en-US,en;q=0.5");


           // Data will be sent to the server.
           String postParams = "secret=" + MyConstants.SECRET_KEY + "&response=" + gRecaptchaResponse;

           // Send Request
           conn.setDoOutput(true);
           
           // Get the output stream of Connection
           // Write data in this stream, which means to send data to Server.
           OutputStream outStream = conn.getOutputStream();
           outStream.write(postParams.getBytes());

           outStream.flush();
           outStream.close();

           // Response code return from server.
           int responseCode = conn.getResponseCode();
           System.out.println("responseCode=" + responseCode);

 
           // Get the InputStream from Connection to read data sent from the server.
           InputStream is = conn.getInputStream();
           JsonParser jsonParser = new JsonParser();
           JsonObject jsonObject = (JsonObject)jsonParser.parse(
                     new InputStreamReader(is, "UTF-8"));

           // ==> {"success": true}
           System.out.println("Response: " + jsonObject);

           boolean success = jsonObject.get("success").getAsBoolean();
           return success;
       } catch (Exception e) {
           e.printStackTrace();
           return false;
       }
   }
}