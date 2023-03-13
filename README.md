# Baby Monitoring App using Arduino

This project is an implementation of a baby monitoring system that uses an Arduino board with built-in detectors to monitor a baby's cries, movements, and if they have soiled themselves. The system also records temperature data and sends notifications to the user's mobile phone even if the user is not home.

## Description
The app uses an Arduino board with built-in detectors to monitor a baby's cries, movements, and if they have soiled themselves. These detectors include a cry detector, motion detector, and wet diaper sensor. The system also records temperature data using a temperature sensor.

When the Arduino board is turned on, it creates a hotspot that can be detected by the Android application. The user can connect to this hotspot using their mobile device and enter their Wi-Fi network's SSID and password in the app. The Arduino board will then connect to the internet and start monitoring the baby.

The system continuously monitors the baby's cry, movement, and wet diaper using the built-in detectors. Whenever any of these detectors is triggered, the system sends a notification to the user's mobile phone, even if the user is not at home. This way, the user can be alerted to any potential issues with the baby, such as crying or needing a diaper change.

In addition to real-time notifications, the system also records the baby's temperature data and displays it in a graph that the user can view in the app. This allows the user to track the baby's temperature over time and detect any changes that may indicate an illness.

## Hardware Requirements

    Arduino board (preferably with built-in Wi-Fi module)
    Cry detector
    Motion detector
    Wet diaper sensor
    Temperature sensor
    Breadboard
    Jumper wires

## Software Requirements

    Arduino IDE
    Android Studio

## How it works

Upon startup, the Arduino board creates a hotspot that can be detected by the Android application. The user can then enter their Wi-Fi network's SSID and password in the app, and the Arduino board will connect to the internet.

The system monitors the baby's cry, movement, and wet diaper using the built-in detectors, and records temperature data using the temperature sensor. The data is then sent to the user's mobile phone via notifications. The user can also view the history statistics of the baby's temperature on a graph in the app.

## License

This project is licensed under the GNU General Public License v2.0 - see the LICENSE.md file for details.
