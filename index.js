const express = require("express");
var exec = require("child_process").exec;
const app = express();
const { SerialPort } = require("serialport");

const PORT = 4000;
const ARDUINO_COM_PORT = "/dev/ttyACM0";

const arduinoSerialPort = new SerialPort({
   path: ARDUINO_COM_PORT,
   baudRate: 9600,
});

app.listen(PORT, () => {
   arduinoSerialPort.on("open", () => {
      console.log("Server Is Connected");
      console.log("Arduino Connected Succesfully");
   });
});

app.get("/control/:action", (req, res) => {
   const action = req.params.action || req.params("action");
   if (action === "on") arduinoSerialPort.write("w");
   else if (action === "off") arduinoSerialPort.write("o");
   res.end("Arduino");
});

app.get("/restart", (req, res) => {
   exec("reboot");
   res.end("Arduino");
});
