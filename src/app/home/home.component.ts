import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.model';
import { CardService } from '../services/card/card.service';
import { Card } from '../models/card.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
  user: User | null = null;
  userId: string | null = null;
  error?: string;
  cards: Card[] = [];

  constructor(
    private authService: AuthService,
    private cardService: CardService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.userId = this.authService.getIdUser();
    this.getUser();
  }


  getUser(): void {
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(
        (user: any) => {
          this.user = user;
          this.getCards();
        },
        (error) => {
          this.error = 'Failed to load user';
          console.error('Error:', error);
        }
      );
    }

  }


  
  getCards() {
    if (this.user?.id) {
      this.cardService.getCard(this.user.id.toString()).subscribe(
        (cards: Card[]) => {
          this.cards = cards;
          console.log('Cards:', this.cards); // Verifique os cartões retornados
        },
        (error) => {
          this.error = 'Failed to load cards';
          console.error('Error:', error); // Verifique o erro
        }
      );
    }

  }

  getCardImage(type: "TRABALHADOR" | "COMUM" | "ESTUDANTE"): string {
    switch (type) {
      case 'ESTUDANTE':
        return 'https://cartaovem.com.br/assets/cartoes/vem_estudante_frente.jpg';
      case 'COMUM':
        return 'https://cartaovem.com.br/assets/cartoes/vem_comum_frente.jpg';
      case 'TRABALHADOR':
        return 'https://cartaovem.com.br/assets/cartoes/vem_trabalhador_frente.jpg';
      default:
        return 'https://via.placeholder.com/300x200'; // Imagem padrão ou de fallback
    }
  }

}
