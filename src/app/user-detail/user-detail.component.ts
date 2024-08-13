import { Component, inject, OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { MatCard, MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  constructor(public dialog: MatDialog, private route: ActivatedRoute) {}
  private firestore: Firestore = inject(Firestore);

  userId = '';
  user: User = new User();

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id') || '';
      if (this.userId) {
        this.getUser();
      } else {
        console.log('Keine userId vorhanden');
      }
    });
  }

  getUser() {
    const docRef = doc(this.firestore, 'users', this.userId);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          this.user = docSnap.data() as User;
        } else {
          console.log('Kein Dokument gefunden');
        }
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen des Dokuments:', error);
      });
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = this.user;
  }

  editUser() {
    this.dialog.open(DialogEditUserComponent);
  }
}
