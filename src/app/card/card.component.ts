import { Component, OnInit } from '@angular/core';
import { Card, CardCreation } from '../models/card.model';
import { CardService } from '../services/card/card.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  users: User[] = [];
  cards: Card[] = [];
  selectedUserId: string | null = null; // ID do usuário selecionado
  error?: string;
  newCard: CardCreation = { name: '', type: 'COMUM' };

  constructor(
    private cardService: CardService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCards();
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUser().subscribe(
      (users: any) => {
        this.users = users;
      },
      (error) => {
        this.error = 'Failed to load users';
        console.error('Error:', error);
      }
    );
  }
  loadCards(): void {
   
      this.cardService.getCard().subscribe(
        (cards: Card[]) => this.cards = cards,
        (error) => {
          this.error = 'Failed to load cards';
          console.error('Error:', error);
        }
      );
    
  }

  createCard() {
    if (this.selectedUserId && this.newCard.name && this.newCard.type) {
      this.cardService.createCard(this.newCard, this.selectedUserId).subscribe(
        (createdCard: Card) => {
          this.cards.push(createdCard);
          this.newCard = { name: '', type: 'COMUM' }; // Reseta o formulário
        },
        (error) => {
          this.error = 'Failed to create card';
          console.error('Error:', error);
        }
      );
    }
  }

  toggleCardStatus(card: Card): void {
    const newStatus = !card.status;
    this.cardService.updateCard(card.id, newStatus).subscribe(
      (updatedCard) => {
        card.status = newStatus;
      },
      (error) => {
        console.error('Failed to update card status', error);
      }
    );
  }

  deleteCard(id: string): void {
    this.cardService.deleteCard(id).subscribe(
      () => {
        this.cards = this.cards.filter(card => card.id !== id);
      },
      (error) => this.error = 'Failed to delete card'
    );
  }
}
