import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8001, { cors: '*' })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  // Inject the MessagesService into the gateway
  constructor(private readonly messagesService: MessagesService) {}

  // Subscribe to the 'createMessage' event
  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    // Delegate the creation of a message to the MessagesService
    const message = await this.messagesService.create(createMessageDto);

    // Emit a new message event with the newly created message
    this.server.emit('newMessage', message);

    // Return the newly created message
    return message;
  }

  // Subscribe to the 'findAllMessages' event
  @SubscribeMessage('findAllMessages')
  findAll() {
    // Delegate finding all messages to the MessagesService
    return this.messagesService.findAll();
  }

  // Subscribe to the 'findOneMessage' event
  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    // Delegate finding a specific message to the MessagesService
    return this.messagesService.findOne(id);
  }

  // Subscribe to the 'removeMessage' event
  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    // Delegate removing a message to the MessagesService
    return this.messagesService.remove(id);
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    // TODO
    console.log('join room');
    return this.messagesService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    // TODO
    console.log('typing');
    const name = await this.messagesService.getClientName(client.id);
    // we want to send to client not to ourself
    client.broadcast.emit('typing', { name, isTyping });
  }
}
