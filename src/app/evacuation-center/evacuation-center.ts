import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-evacuation-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evacuation-center.html'
})
export class EvacuationCenter {

  centers: any[] = [];
  formData: any = {};
  editingId: string | null = null;

  constructor(private firestore: Firestore) {
    const colRef = collection(this.firestore, 'evacuation_centers');
    collectionData(colRef, { idField: 'id' }).subscribe(data => {
      this.centers = data;
    });
  }

  saveRecord() {
    const colRef = collection(this.firestore, 'evacuation_centers');
    if (this.editingId) {
      const docRef = doc(this.firestore, `evacuation_centers/${this.editingId}`);
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
    const docRef = doc(this.firestore, `evacuation_centers/${id}`);
    deleteDoc(docRef);
  }
}