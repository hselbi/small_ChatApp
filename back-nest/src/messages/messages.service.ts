import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'Slops', message: 'Heyyyooo' }];
  clientToUser = {};

  identify(name: string, clientId: string) {
    // u can do this with database
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto) {
    const msgs = { ...createMessageDto };
    // This action adds a new message
    this.messages.push(msgs); // TODO improve it
    return msgs;
  }

  findAll() {
    // This action returns all messages
    return this.messages;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
