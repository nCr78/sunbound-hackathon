import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { DataService, RouteModel } from '../services/data.service';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-nearby-routes',
  templateUrl: './show-nearby-routes.page.html',
  styleUrls: ['./show-nearby-routes.page.scss'],
})
export class ShowNearbyRoutesPage implements OnInit, OnDestroy {
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
  sub: Subscription;
  constructor(private dataSrv: DataService, private snackBar: ToastController) { }

  @ViewChild('myDiv', { static: false }) set myDivSetter(ref: ElementRef) {
    this.myDiv = ref;
    if (ref) {
      setTimeout(() => {
        const div = ref.nativeElement as HTMLDivElement;
        const rect = div.getBoundingClientRect();
        Object.values(div.getClientRects()).forEach(r => console.log(r));
        this.clientHeight = rect.height - 44 - 7;
        this.clientWidth = rect.width;
        this.initMarkers();
      }, 1);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.googleMapRef = null;
  }

  initMarkers() {
    this.sub = this.dataSrv.getPublicRoutes().subscribe((res: RouteModel[]) => {
      res.forEach((routeData, index) => {
        const newMarker = new google.maps.Marker({
          position: routeData.start,
          map: this.googleMapRef.googleMap,
          draggable: true,
          label: {
            color: 'white',
            text: '' + (index + 1)
          }
        });
        newMarker.addListener('click', (e) => {
          newMarker.setOpacity(0);
          this.createRouteFromMarkerPositions(routeData);
        });
        this.markers.push(newMarker);
      });
    });
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

  createRouteFromMarkerPositions(routeData: RouteModel) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.googleMapRef.googleMap
    });
    this.calculateAndDisplayRoute(
      new google.maps.LatLng(routeData.start),
      new google.maps.LatLng(routeData.finish),
      routeData.waypoints.map(w => ({ location: new google.maps.LatLng(w.lat, w.lng) }))
    );
  }
}
