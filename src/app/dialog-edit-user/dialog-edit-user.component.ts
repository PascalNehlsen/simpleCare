import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  user!: User;
  userId!: string;
  private firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {}

  saveUser() {
    const userRef = doc(this.firestore, 'users', this.userId);

    updateDoc(userRef, this.user.toJSON())
      .then(() => {
        console.log('User successfully updated');
      })
      .catch((error) => {
        console.error('Error updating user: ', error);
      });
    this.dialogRef.close();
  }
}
