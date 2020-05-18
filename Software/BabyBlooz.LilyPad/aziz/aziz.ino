#include <ArduinoJson.h>

/* SendDemo.ino
 * 
 * Posts data every certain period of time, under the correct conditions:
 * Counter is sent to the specified server around every 5 seconds, but only if
 * it is a multiple of 2.
 * 
 * Uses the WifiEsp.h library found at https://github.com/bportaluri/WiFiEsp/archive/master.zip.
 * Partially based off of the WebClient.ino example code in the WifiEsp library.
 */

#include "WiFiEsp.h"

// Emulate Serial1 on pins 2 (RX) and 3 (TX)
#ifndef HAVE_HWSERIAL1
#include "SoftwareSerial.h"
SoftwareSerial Serial1(2, 3);
#endif
const int SCAN_SECS = 2;
String ssid="s8";
String pass="12345678";
  // your network SSID (name)
char hotspotssid[] = "Lilypad-test";        
char hotspotpass[] = "12345678";  // password of above network
int status = WL_IDLE_STATUS;     // the Wifi radio's status
bool WifiConnected=false;
bool ReceivedNewData=false;
bool HandlingBusy=false;
bool HotspotActive=false;
int wiFiStatus = WL_IDLE_STATUS;
char server_url[] = "149.233.36.113";          // http://149.233.36.113
int server_port = 5000;                    // Port of server/website to connect to
RingBuffer buf(8);
String lilypad = "test1";
StaticJsonBuffer<200> jsonBuffer;
WiFiEspServer server(80);
int pulsePin = A0;                 // Pulse Sensor purple wire connected to analog pin A0
int blinkPin = 13;                // pin to blink led at each beat

// Volatile Variables, used in the interrupt service routine!
volatile int BPM;                   // int that holds raw Analog in 0. updated every 2mS
volatile int Signal;                // holds the incoming raw data
volatile int IBI = 600;             // int that holds the time interval between beats! Must be seeded! 
volatile boolean Pulse = false;     // "True" when User's live heartbeat is detected. "False" when not a "live beat". 
volatile boolean QS = false;        // becomes true when Arduoino finds a beat.

static boolean serialVisual = true;   // Set to 'false' by Default.  Re-set to 'true' to see Arduino Serial Monitor ASCII Visual Pulse 

volatile int rate[10];                      // array to hold last ten IBI values
volatile unsigned long sampleCounter = 0;          // used to determine pulse timing
volatile unsigned long lastBeatTime = 0;           // used to find IBI
volatile int P = 512;                      // used to find peak in pulse wave, seeded
volatile int T = 512;                     // used to find trough in pulse wave, seeded
volatile int thresh = 525;                // used to find instant moment of heart beat, seeded
volatile int amp = 100;                   // used to hold amplitude of pulse waveform, seeded
volatile boolean firstBeat = true;        // used to seed rate array so we startup with reasonable BPM
volatile boolean secondBeat = false;      // used to seed rate array so we startup with reasonable BPM
void setup() {
  Serial.begin(115200);
  // Initialize serial used by the ESP module
  Serial1.begin(115200);
interruptSetup(); 
  openHotspot();
  handleClient(server);
  //connectToWifi();
}

bool connectToWifi(){
  HotspotActive=false;
  int ssidlength = ssid.length(); 
  int passwordlength = pass.length();
  char ssid_array[ssidlength + 1]; 
  char pass_array[passwordlength + 1]; 
    // copying the contents of the 
    // string to char array 
  strcpy(ssid_array, ssid.c_str()); 
  strcpy(pass_array, pass.c_str());
  const int MaxWifiConnectionAttempt=3;
  int ConnectionAttemptsCounter=1;
  // Initialize ESP module
  WiFi.init(&Serial1);

  /* Connect to the WiFi network */
  while (WiFi.status() != WL_CONNECTED && ConnectionAttemptsCounter<=3) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Attempt to connect to network
    wiFiStatus = WiFi.begin(ssid_array, pass_array);
    ConnectionAttemptsCounter++;
  }
  if (ConnectionAttemptsCounter>3){
     Serial.println("Unable to connect to the Network: ");
     WifiConnected=false;
     ReceivedNewData=false;

  }else {
   // If reached here, are now connected to the network
  Serial.println("You are connected to the network: ");
  printWiFiStatus();  
  WifiConnected=true; 
  }
}
void loop() {
  serialOutput();  
   WifiConnected=WiFi.status()==WL_CONNECTED;
  if (QS == true) // A Heartbeat Was Found
    {     
      // BPM and IBI have been Determined
      // Quantified Self "QS" true when arduino finds a heartbeat
      serialOutputWhenBeatHappens(); // A Beat Happened, Output that to serial.     
      QS = false; // reset the Quantified Self flag for next time    
    }
     
  delay(20); //  take a break
int Xacceleration = random(30);
int Yacceleration =random(30);
int Zacceleration =random(30);
int Heartbeat =BPM;
int sound =random(60);
int temperature =random(36,39);
if(!WifiConnected && HotspotActive)
{
  handleClient(server);
}
if (WifiConnected) {
  
String test1="{\"lilypadId\": \"" + lilypad + "\",\"MovementXYZ\":{\"Xacceleration\" : "+String(Xacceleration)+",\"Yacceleration\" : "+String(Yacceleration)+",\"Zacceleration\" : "+String(Zacceleration)+"},\"Heartbeat\":"+String(Heartbeat)+",\"sound\":"+String(sound)+",\"temperature\":"+String(temperature)+"}";
  postData(String(test1));
  Serial.println(String(test1));
} else if (ReceivedNewData && !HandlingBusy){
  connectToWifi();
  }

else if(!HandlingBusy || !HotspotActive ) {
  Serial.println("I m here");
  Serial.println(ReceivedNewData);
  Serial.println(HotspotActive);
  Serial.println(HandlingBusy);
  setup();
  }
}

void printWiFiStatus() {
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  Serial.print("IP addr of shield: ");
  Serial.println(WiFi.localIP());
}
bool openHotspot ()
{
  HotspotActive=true;
  // Initialize ESP module
   WiFi.init(&Serial1);    // initialize ESP module

  // check for the presence of the shield
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    return false;
  }

  Serial.print("Attempting to start AP ");
  Serial.println(hotspotssid);

  IPAddress localIp(192, 168, 4, 1);
  WiFi.configAP(localIp);
  // start access point
  status = WiFi.beginAP(hotspotssid, 10, hotspotpass, ENC_TYPE_WPA2_PSK);
  printWiFiStatus();
  // start the web server on port 80
  server.begin();
// server.on("/body", handleClient);
  Serial.println("Server started");
  return true;
  }
/* HTTP POSTs the given string to the server (as is). */
void postData(String dataString) {
  WiFiEspClient client;

  /* Some postData-specific constants.*/
  const int MAX_ATTEMPTS = 3;      // The number of attempts to connect to server before giving up.
  const int RETRY_SECS = 5;        // How long to wait before retrying connecting to the server..
  const int TIMEOUT_SECS = 1;      // How long to wait for an HTTP OK / reply.

  // Initialize Ethernet client object

  int attempts = 0;

  /* Attempt to connect to server. */
  while(attempts < MAX_ATTEMPTS) {
    
    Serial.println("[postData] Connect attempt #" + String(attempts));
    if (client.connect(server_url, server_port)) {
      Serial.println("[postData] Connected to server!");

      /* Send the HTTP POST. */
      String formattedString =dataString;

      String postString = getPostString("/api/data", String(server_url) + ":" + String(server_port), formattedString);
      Serial.println(postString);
      client.print(postString);
     
      Serial.println("Sent my message to server.");
      break;
    } else {
      Serial.println("Attempt #" + String(attempts) + "failed.");
      attempts++;
      // Wait a second for server to ready before attempting another connection
      delay(RETRY_SECS * 1000);
    }
  }

  if (attempts >= MAX_ATTEMPTS) {
    Serial.println("[postData] Server connection failed! Did not send any data.");
  } else {

    /* Wait for the server disconnecting, at least until some timeout. */
    unsigned long startTime = millis();
    while (millis() - startTime < (TIMEOUT_SECS * 1000)) {

     // Read any reply from the server and print it to terminal
      /*while(client.available() > 0) {
        char c = client.read();
        Serial.write(c);
      }*/

      // If server's disconnected, don't bother waiting for timeout
      if (!client.connected()) {
        Serial.println("Disconnected");

        Serial.println("[postData] The server disconnected.");
        break;       
      }
    }
  }

  /* Stop the client before returning*/
  Serial.println("[postData] Reached end, stopping client.");
  client.stop();

  return;
}
void sendHttpResponse(WiFiEspClient client, RingBuffer buf)
{
  client.print(
    "HTTP/1.1 200 OK\r\n"
    "Content-Type: text/html\r\n"
    "\r\n");
  //client.stop();

}
void handleClient (WiFiEspServer server){
  bool found=false;
  HandlingBusy=true;
  WiFiEspClient client;
  client = server.available();
  if (client) {                               // if you get a client,
    buf.init();
    String toprint;
  int a;
    while (client.connected()) {              // loop while the client's connected

      if (client.available()) {               // if there's bytes to read from the client,
        char c = client.read();               // read a byte, then
      
        buf.push(c);                          // push it to the ring buffer
    
        
        if (c=='{') {
        found=true;
        }
        if(found==true){
        toprint =toprint + c;
        }
        if (c=='}') {
          Serial.println("End of json");

          ReceivedNewData=true;
          found=false;
          toprint =toprint + c;
          sendHttpResponse(client,buf);
          break;
        }
       
        
         
      }
    }
     delay(10);
     if(ReceivedNewData){
      JsonObject& root = jsonBuffer.parseObject(toprint);
               String ssidJSON = root["SSID"];
              String passJSON = root["PASSWORD"];
ssid = ssidJSON;
pass = passJSON;
      }

 
       // give the web browser time to receive the data
    delay(15);
              HandlingBusy=false;

    // close the connection
    client.stop();
    Serial.println("Client disconnected");

  }
}
/*  getPostString: Puts POST data into a correctly formatted HTTP POST request.
 *    args:
 *      location - the folder to post to (ex. "/", "/bin")
 *      host - the location to send the string (format: either url or ip:port)
 *      data - the string, verbatim, to post
 *    returns:
 *      a string containing the corresponding correct HTTP POST request
 */
String getPostString(String location, String host, String data) {
  String postString = "";

  postString += "POST " + location + " HTTP/1.1\r\n";
  postString += "Host: " + host + "\r\n";
  postString += "Connection: close\r\n";
  postString += "Content-Length: " + String(data.length()) + "\r\n";
  postString += "Content-Type: application/json\r\n";
     postString += "\r\n";

  postString += data;

  return postString;
}
//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//code copied from arduino.cc 




void interruptSetup()
{     
  // Initializes Timer2 to throw an interrupt every 2mS.
  TCCR2A = 0x02;     // DISABLE PWM ON DIGITAL PINS 3 AND 11, AND GO INTO CTC MODE
  TCCR2B = 0x06;     // DON'T FORCE COMPARE, 256 PRESCALER 
  OCR2A = 0X7C;      // SET THE TOP OF THE COUNT TO 124 FOR 500Hz SAMPLE RATE
  TIMSK2 = 0x02;     // ENABLE INTERRUPT ON MATCH BETWEEN TIMER2 AND OCR2A
  sei();             // MAKE SURE GLOBAL INTERRUPTS ARE ENABLED      
} 

void serialOutput()
{   // Decide How To Output Serial. 
 if (serialVisual == true)
  {  
     arduinoSerialMonitorVisual('-', Signal);   // goes to function that makes Serial Monitor Visualizer
  } 
 else
  {
      sendDataToSerial('S', Signal);     // goes to sendDataToSerial function
   }        
}

void serialOutputWhenBeatHappens()
{    
 if (serialVisual == true) //  Code to Make the Serial Monitor Visualizer Work
   {            
     Serial.print(" Heart-Beat Found ");  //ASCII Art Madness
     Serial.print("BPM: ");
     Serial.println(BPM);
   }
 else
   {
     sendDataToSerial('B',BPM);   // send heart rate with a 'B' prefix
     sendDataToSerial('Q',IBI);   // send time between beats with a 'Q' prefix
   }   
}

void arduinoSerialMonitorVisual(char symbol, int data )
{    
  const int sensorMin = 0;      // sensor minimum, discovered through experiment
  const int sensorMax = 1024;    // sensor maximum, discovered through experiment
  int sensorReading = data; // map the sensor range to a range of 12 options:
  int range = map(sensorReading, sensorMin, sensorMax, 0, 11);
  // do something different depending on the 
  // range value:
}


void sendDataToSerial(char symbol, int data )
{
   Serial.print(symbol);
   Serial.println(data);                
}

ISR(TIMER2_COMPA_vect) //triggered when Timer2 counts to 124
{  
  cli();                                      // disable interrupts while we do this
  Signal = analogRead(pulsePin);              // read the Pulse Sensor 
  sampleCounter += 2;                         // keep track of the time in mS with this variable
  int N = sampleCounter - lastBeatTime;       // monitor the time since the last beat to avoid noise
                                              //  find the peak and trough of the pulse wave
  if(Signal < thresh && N > (IBI/5)*3) // avoid dichrotic noise by waiting 3/5 of last IBI
    {      
      if (Signal < T) // T is the trough
      {                        
        T = Signal; // keep track of lowest point in pulse wave 
      }
    }

  if(Signal > thresh && Signal > P)
    {          // thresh condition helps avoid noise
      P = Signal;                             // P is the peak
    }                                        // keep track of highest point in pulse wave

  //  NOW IT'S TIME TO LOOK FOR THE HEART BEAT
  // signal surges up in value every time there is a pulse
  if (N > 250)
  {                                   // avoid high frequency noise
    if ( (Signal > thresh) && (Pulse == false) && (N > (IBI/5)*3) )
      {        
        Pulse = true;                               // set the Pulse flag when we think there is a pulse
        digitalWrite(blinkPin,HIGH);                // turn on pin 13 LED
        IBI = sampleCounter - lastBeatTime;         // measure time between beats in mS
        lastBeatTime = sampleCounter;               // keep track of time for next pulse
  
        if(secondBeat)
        {                        // if this is the second beat, if secondBeat == TRUE
          secondBeat = false;                  // clear secondBeat flag
          for(int i=0; i<=9; i++) // seed the running total to get a realisitic BPM at startup
          {             
            rate[i] = IBI;                      
          }
        }
  
        if(firstBeat) // if it's the first time we found a beat, if firstBeat == TRUE
        {                         
          firstBeat = false;                   // clear firstBeat flag
          secondBeat = true;                   // set the second beat flag
          sei();                               // enable interrupts again
          return;                              // IBI value is unreliable so discard it
        }   
      // keep a running total of the last 10 IBI values
      word runningTotal = 0;                  // clear the runningTotal variable    

      for(int i=0; i<=8; i++)
        {                // shift data in the rate array
          rate[i] = rate[i+1];                  // and drop the oldest IBI value 
          runningTotal += rate[i];              // add up the 9 oldest IBI values
        }

      rate[9] = IBI;                          // add the latest IBI to the rate array
      runningTotal += rate[9];                // add the latest IBI to runningTotal
      runningTotal /= 10;                     // average the last 10 IBI values 
      BPM = 60000/runningTotal;               // how many beats can fit into a minute? that's BPM!
      QS = true;                              // set Quantified Self flag 
      // QS FLAG IS NOT CLEARED INSIDE THIS ISR
    }                       
  }

  if (Signal < thresh && Pulse == true)
    {   // when the values are going down, the beat is over
      digitalWrite(blinkPin,LOW);            // turn off pin 13 LED
      Pulse = false;                         // reset the Pulse flag so we can do it again
      amp = P - T;                           // get amplitude of the pulse wave
      thresh = amp/2 + T;                    // set thresh at 50% of the amplitude
      P = thresh;                            // reset these for next time
      T = thresh;
    }

  if (N > 2500)
    {                           // if 2.5 seconds go by without a beat
      thresh = 512;                          // set thresh default
      P = 512;                               // set P default
      T = 512;                               // set T default
      lastBeatTime = sampleCounter;          // bring the lastBeatTime up to date        
      firstBeat = true;                      // set these to avoid noise
      secondBeat = false;                    // when we get the heartbeat back
    }

  sei();                                   // enable interrupts when youre done!
}// end isr
