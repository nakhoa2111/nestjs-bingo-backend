import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import GameManager from 'src/manager/GameManager';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:7456', // client address
  },
})
export class BingoService implements OnModuleInit {
  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`${socket.id} - Connected`);
    });
    this.server.on('error', (error) => {
      console.log(error);
    });
    const generateNumberInterval = setInterval(() => {
      if (!GameManager.getInstance().isFullNumberQueue()) {
        this.generateNumber();
      } else {
        clearInterval(generateNumberInterval);
      }
    }, 5000);
  }

  generateNumber() {
    const generatedNumber = GameManager.getInstance().generateNumber();
    this.server.emit('new-number', generatedNumber);
  }
}
