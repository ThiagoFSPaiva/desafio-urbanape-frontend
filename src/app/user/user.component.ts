import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { User, UserCreation } from '../models/user.model';
import { UserService } from '../services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  currentUser: UserCreation = { name: '', email: '', role: 'USER', password: '' };
  isEditing = false;
  editingUserId: string | null = null; // Ajustado para número

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUser().subscribe(
      (users: any) => {
        this.users = users;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isEditing) {
      if (this.editingUserId !== null) {
        this.userService.updateUser(this.currentUser, this.editingUserId).subscribe(
          () => {
            this.loadUsers();
            this.resetForm();
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      }
    } else {
      this.userService.createUser(this.currentUser).subscribe(
        () => {
          this.loadUsers();
          this.resetForm();
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }

  editUser(user: any): void {
    this.currentUser = { name: user.name, email: user.email, role: user.role, password: user.password };
    this.isEditing = true;
    this.editingUserId = user.id; // Ajustado para número
  }

  deleteUser(id: string): void { // Ajustado para número
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id.toString()).subscribe( // Convertendo para string
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.currentUser = { name: '', email: '', role: 'USER', password: '' };
    this.isEditing = false;
    this.editingUserId = null;
  }
}