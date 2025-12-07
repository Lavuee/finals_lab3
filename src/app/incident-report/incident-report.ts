import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-incident-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incident-report.html'
})
export class IncidentReport {

  incidents: any[] = [];
  formData: any = {};
  editingId: string | null = null;

  constructor(private firestore: Firestore) {
    const colRef = collection(this.firestore, 'disaster_incidents');
    collectionData(colRef, { idField: 'id' }).subscribe(data => {
      this.incidents = data;
    });
  }

  saveRecord() {
    const colRef = collection(this.firestore, 'disaster_incidents');
    if (this.editingId) {
      const docRef = doc(this.firestore, `disaster_incidents/${this.editingId}`);
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
    const docRef = doc(this.firestore, `disaster_incidents/${id}`);
    deleteDoc(docRef);
  }
}