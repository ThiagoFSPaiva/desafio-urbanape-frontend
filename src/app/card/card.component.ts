import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { CardService } from '../services/card/card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  cards: Card[] = [];
  userId: string | null = null; // Defina o ID do usuário aqui
  error?: string;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    
      this.cardService.getCard().subscribe(
        (cards: Card[]) => this.cards = cards,
        (error) => this.error = 'Failed to load cards'
      );
  
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
