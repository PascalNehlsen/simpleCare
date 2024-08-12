import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  allUsers: any[] = [];

  private firestore: Firestore = inject(Firestore);

  ngOnInit(): void {
    const colRef = collection(this.firestore, 'users');

    const unsub = onSnapshot(colRef, (snapshot) => {
      this.allUsers = [];
      snapshot.forEach((doc) => {
        this.allUsers.push({ id: doc.id, ...doc.data() });
      });

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          console.log('Neues Dokument:', change.doc.data());
        }
        if (change.type === 'modified') {
          console.log('Geändertes Dokument:', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Gelöschtes Dokument:', change.doc.data());
        }
      });
    });
  }

  user: User = new User();

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
