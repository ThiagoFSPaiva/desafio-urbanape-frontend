import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RouterLinkActiveExactDirectiveDirective } from '../shared/directives/router-link-active-exact-directive.directive';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLinkActiveExactDirectiveDirective,  RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean;
  
  constructor(private authService: AuthService) {
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
      
  }
}