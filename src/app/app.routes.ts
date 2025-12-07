import { Routes } from '@angular/router';
import { IncidentReport } from './incident-report/incident-report';
import { ReliefDistribution } from './relief-distribution/relief-distribution';
import { EvacuationCenter } from './evacuation-center/evacuation-center';

export const routes: Routes = [
  { path: '', redirectTo: '/incidents-record', pathMatch: 'full' },
  { path: 'incidents-record', component: IncidentReport },
  { path: 'relief-distribution', component: ReliefDistribution },
  { path: 'evacuation-center', component: EvacuationCenter }
];
