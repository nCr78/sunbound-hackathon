import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-create-new-route',
  templateUrl: './create-new-route.component.html',
  styleUrls: ['./create-new-route.component.scss'],
})
export class CreateNewRouteComponent implements OnInit {
  showingRoute = false;
  myDiv: ElementRef = null;
  // apiLoaded: Observable<boolean>;
  clientHeight = 0;
  clientWidth = 0;
  options: google.maps.MapOptions = {
    center: { lat: 37.9704578, lng: 23.7235891 },
    zoom: 15,
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false
  };
  markerOptions: google.maps.MarkerOptions = {draggable: true};
  markers: google.maps.Marker[] = [];
  googleMapRef: GoogleMap;
  directionsService: google.maps.DirectionsService;
  directionsDisplay: google.maps.DirectionsRenderer;
  /* <map-marker *ngFor="let markerPosition of markerPositions"
                  (mapDblclick)="removeFromMap(markerPosition)"
                  [position]="markerPosition"
                  [options]="markerOptions"></map-marker> */

  constructor(private dataSrv: DataService, private snackBar: ToastController) {
    // this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDxH1zibNbVtNV6Vxh1AKBUFstexcJHYhQ', 'callback')
    //   .pipe(
    //     map(() => true),
    //     catchError(() => of(false))
    //   );
  }

  @ViewChild('myDiv', { static: false }) set myDivSetter(ref: ElementRef) {
    this.myDiv = ref;
    if (ref) {
      setTimeout(() => {
        const div = ref.nativeElement as HTMLDivElement;
        const rect = div.getBoundingClientRect();
        Object.values(div.getClientRects()).forEach(r => console.log(r));
        this.clientHeight = rect.height - 44 - 7;
        this.clientWidth = rect.width;
      }, 1);
    }
  }

  // TODO:
  // user registration through google/fb/email -> implement it + create form etc

  // find volunteer should have a form to submit to firestore database
  // the form will contain: location lat/lng (1), hour + date + duration, comments
  // once he creates this, if he goes again to same button (find volunteer), it will show him his submition
  // if a volunteer has chosen us, then the button is disabled

  // volunteer version: check calendar or search specific date range to get results of handicapped people submitions
  // + profile page maybe
  // polish UI and test if we have time on android phone / studio virtualization
  ngOnInit() {}

  dropMarkerAtCurrentLocation() {
    const latLng: google.maps.LatLngLiteral = {
      lat: this.googleMapRef.getCenter().lat(),
      lng: this.googleMapRef.getCenter().lng()
    };
    const newMarker = new google.maps.Marker({
      position: latLng,
      map: this.googleMapRef.googleMap,
      draggable: true,
      label: {
        color: 'white',
        text: '' + this.toLetters(this.markers.length + 1)
      }
    });
    newMarker.addListener('dragend', (e) => {
      console.log(e, newMarker.getPosition());
    });
    newMarker.addListener('dblclick', (e) => {
      newMarker.setMap(null);
      this.markers.splice(this.markers.indexOf(newMarker), 1);
    });
    this.markers.push(newMarker);
  }

  toLetters(num) {
    const mod = num % 26;
    // eslint-disable-next-line no-bitwise
    let pow = num / 26 | 0;
    const out = mod ? String.fromCharCode(64 + mod) : (--pow ?? 'Z');
    return pow ? this.toLetters(pow) + out : out;
  }

  createRouteFromMarkerPositions() {
    if (this.markers.length < 2) { return; }
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.googleMapRef.googleMap
    });
    this.calculateAndDisplayRoute(
      this.getStartFinishAndWaypoints().start,
      this.getStartFinishAndWaypoints().finish,
      this.getStartFinishAndWaypoints().waypoints
    );
  }

  getStartFinishAndWaypoints(): {
    start: google.maps.LatLng; finish: google.maps.LatLng; waypoints: google.maps.DirectionsWaypoint[];
  } {
    const waypoints: google.maps.DirectionsWaypoint[] = [];
    this.markers.forEach((v, index) => {
      v.setOpacity(0);
      if (index !== 0 && index !== this.markers.length - 1) {
        waypoints.push({location: new google.maps.LatLng(v.getPosition().lat(), v.getPosition().lng())});
      }
    });
    return { start: this.markers[0].getPosition(), finish: this.markers[this.markers.length - 1].getPosition(), waypoints };
  }

  calculateAndDisplayRoute(pointA: google.maps.LatLng,
                           pointB: google.maps.LatLng,
                           waypoints: google.maps.DirectionsWaypoint[]) {
    this.directionsService.route({
      origin: pointA,
      destination: pointB,
      travelMode: google.maps.TravelMode.WALKING,
      waypoints
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        this.showingRoute = true;
      } else {
        this.snackBar.create({
          message: 'Directions request failed due to ' + status,
          duration: 7800});
      }
    });
  }

  deleteRouteAndMarkers() {
    this.directionsDisplay?.setMap(null);
    this.markers.forEach(m => {
      m.setMap(null);
    });
    this.markers = [];
    this.showingRoute = false;
  }

  saveRouteToDatabase() {
    this.dataSrv.createPublicRoute(
      this.getStartFinishAndWaypoints().start,
      this.getStartFinishAndWaypoints().finish,
      this.getStartFinishAndWaypoints().waypoints)
      .then(res => console.log(res))
      .catch(e => console.error(e));
  }
}
