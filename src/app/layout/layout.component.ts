import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLinkActiveExactDirectiveDirective } from '../shared/directives/router-link-active-exact-directive.directive';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,SidebarComponent, RouterOutlet, RouterLinkActiveExactDirectiveDirective],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  ngOnInit() {
   

  }

}
