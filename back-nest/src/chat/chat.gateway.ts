import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

/*
 * connect all client with are connect with gateway
 */
@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  @WebSocketServer()
  server;
  // constructor(private readonly chatApp)
  // print id of connection with front
  handleConnection(client) {
    console.log(client.id);
  }
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(message); // print message that i get from client-side(front-end)
    this.server.emit('message', message); // send back this message into client-side
  }
}
