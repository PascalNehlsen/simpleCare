import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormField,
    MatProgressBar,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  user!: User;

  saveUser() {}
}
