#include <WiFiNINA.h>
#include <SPI.h>
#include <Servo.h>

const char* ssid = "BC STUDENTS";
const char* password = "belgiumcampus";

WiFiServer server(80); // server port is 80

// store HTTP request
String header;

unsigned long currentTime = millis();
unsigned long previousTime = 0;
const long timeoutTime = 2000;

Servo servo1;

String servoState = "Closed";

const int servoPin = 5;

void setup() {
  Serial.begin(115200);
  servo1.attach(servoPin);
  
  // Check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    while (true); // don't continue
  }

  // Attempt to connect to WiFi network:
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  server.begin();
}

void loop() {
  WiFiClient client = server.available();

  if (client) {
    currentTime = millis();
    previousTime = currentTime;
    String currentLine = "";
    while (client.connected() && currentTime - previousTime <= timeoutTime) {
      currentTime = millis();
      if (client.available()) {
        char readByte = client.read();
        header += readByte;
        if (readByte == '\n') {
          if (currentLine.length() == 0) {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();

            if (header.indexOf("GET /Closed") >= 0) {
              Serial.println("Close servo");
              servo1.write(0);
              servoState = "Closed";
            } else if (header.indexOf("GET /Open") >= 0) {
              Serial.println("Open servo");
              servo1.write(95);
              servoState = "Open";
            }

            // Display the HTML web page
            client.println("<!DOCTYPE html><html>");
            client.println("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
            client.println("<link rel=\"icon\" href=\"data:,\">");
            // CSS to style the on/off buttons
            client.println("<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}");
            client.println(".button { background-color: #4CAF50; border: none; color: white; padding: 16px 40px;");
            client.println("text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer;}");
            client.println(".buttonClosed {background-color: #555555;}</style></head>");

            // Web Page title
            client.println("<body><h1>Open or close releasing mechanism</h1>");

            if (servoState == "Open") {
              client.println("<p><a href=\"/Closed\"><button class=\"button buttonClosed\">Close</button></a></p>");
            } else {
              client.println("<p><a href=\"/Open\"><button class=\"button\">Open</button></a></p>");
            }
            client.println("</body></html>");
            client.println();
           ;
          } else {
            currentLine = "";
          }
        } else if (readByte != '\r') {
          currentLine += readByte;
        }
      }
    }
    header = "";
    // Close the connection
    client.stop();
    Serial.println("Client disconnected.");
    Serial.println("");
  }
}
