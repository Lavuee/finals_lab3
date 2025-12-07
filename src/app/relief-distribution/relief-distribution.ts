import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-relief-distribution',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relief-distribution.html'
})
export class ReliefDistribution {

  distributions: any[] = [];
  formData: any = {};
  editingId: string | null = null;

  constructor(private firestore: Firestore) {
    const colRef = collection(this.firestore, 'relief_distribution');
    collectionData(colRef, { idField: 'id' }).subscribe(data => {
      this.distributions = data;
    });
  }

  saveRecord() {
    const colRef = collection(this.firestore, 'relief_distribution');
    if (this.editingId) {
      const docRef = doc(this.firestore, `relief_distribution/${this.editingId}`);
      updateDoc(docRef, this.formData);
      this.editingId = null;
    } else {
      addDoc(colRef, this.formData);
    }
    this.formData = {};
  }

  editRecord(item: any) {
    this.formData = { ...item };
    this.editingId = item.id;
  }

  deleteRecord(id: string) {
    const docRef = doc(this.firestore, `relief_distribution/${id}`);
    deleteDoc(docRef);
  }
}