const { createServer } = require("http");
const express = require('express');
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(__dirname + '/front'));

httpServer.listen(4000, () => {
  console.log('server en puerto', 4000)
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// comunicacion serial
const {SerialPort} = require('serialport')
const {DelimiterParser} = require('@serialport/parser-delimiter')

const port = new SerialPort(
    {
      path: 'COM13', 
      baudRate: 9600 
    });

const parser = port.pipe(new DelimiterParser({ delimiter: '\n' }));

// lectura de datos del puerto serie
parser.on("open", () => {
  console.log('Serial port abierto');
});

parser.on('data', data =>{
  var enc = new TextDecoder();
  var arr = new Uint8Array(data);
  dataReady = enc.decode(arr);
  console.log('Recibido de arduino:', parseInt(dataReady));
  io.emit('contador', dataReady);
});

port.on('error', err => {
  console.log(err);
})

