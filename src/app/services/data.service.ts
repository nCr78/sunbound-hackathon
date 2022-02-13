import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public firestore: Firestore) { }

  async createPublicRoute(start: google.maps.LatLng,
                          finish: google.maps.LatLng,
                          waypoints: google.maps.DirectionsWaypoint[]): Promise<string> {
    const publicRouteData = {
      created: Timestamp.fromDate(new Date()),
      start: start.toJSON(),
      finish: finish.toJSON(),
      waypoints: waypoints.map(w => new google.maps.LatLng(w.location as google.maps.LatLng).toJSON())
    } as RouteModel;
    console.log(publicRouteData);
    const collectionRef = collection(this.firestore, 'publicRoutes');
    const documentRef = await addDoc(collectionRef, publicRouteData);
    return documentRef.id;
  }

  getPublicRoutes(): Observable<any> {
    const publicRoutesRef = collection(this.firestore, `publicRoutes`);
    return collectionData(publicRoutesRef);
  }

  async createFindVolunteerRequest(start: google.maps.LatLng, duration: string, date: Date): Promise<string> {
    const volunteerRequestsData = {
      created: Timestamp.fromDate(new Date()),
      start: start.toJSON(),
      duration,
      date
    } as FindVolunteerRequestModel;
    console.log(volunteerRequestsData);
    const collectionRef = collection(this.firestore, 'volunteerRequests');
    const documentRef = await addDoc(collectionRef, volunteerRequestsData);
    return documentRef.id;
  }

  async getFindVolunteerRequestByID(id: string): Promise<FindVolunteerRequestModel> {
    const roomRef = doc(this.firestore, `chatRooms/${id}`);
    const docSnapshot = await getDoc(roomRef);
    const { created, start, duration, date } = docSnapshot.data();
    return { created, start, duration, date };
  }

  getFindVolunteerRequests(): Observable<any> {
    const volunteerRequestsRef = collection(this.firestore, `volunteerRequests`);
    return collectionData(volunteerRequestsRef);
  }
}

export interface RouteModel {
  created: Timestamp;
  start: google.maps.LatLngLiteral;
  finish: google.maps.LatLngLiteral;
  waypoints: google.maps.LatLngLiteral[];
}

export interface FindVolunteerRequestModel {
  created: Timestamp;
  start: google.maps.LatLngLiteral;
  duration: string;
  date: Date;
}
