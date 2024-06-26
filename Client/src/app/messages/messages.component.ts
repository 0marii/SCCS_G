import { Component, OnInit } from '@angular/core';
import { message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
  messages?: message[];
  pagination?: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;
  constructor(private messageService:MessageService) { }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next: Response => {
        this.messages = Response.result;
        this.pagination = Response.pagination;
        this.loading = false;
      }
    });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }
  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: () => this.messages?.splice(this.messages.findIndex(x => x.id === id),1)
    })
  }

  ngOnInit(): void {
    this.loadMessages();
    }

}
