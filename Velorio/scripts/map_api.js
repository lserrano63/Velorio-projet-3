class Map 
{
  constructor() 
  {
    this.map = L.map('map').setView([45.75, 4.85], 13);
    this.markers = L.markerClusterGroup();
    this.greenIcon = L.icon({
      iconUrl: 'pics/marker.png',
      iconSize:     [25, 41], 
      iconAnchor: [13,41],
      className : 'green_marker',
    });
    this.redIcon = L.icon({
      iconUrl: 'pics/marker.png',
      iconSize:     [25, 41], 
      iconAnchor: [13,41],
      className : 'red_marker',
    });
    this.orangeIcon = L.icon({
      iconUrl: 'pics/marker.png',
      iconSize:     [25, 41], 
      iconAnchor: [13,41],
      className : 'orange_marker',
    });
    this.chosenIcon = this.greenIcon;
    this.url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=4348906054be78750668c460dd35c6b5f3650c90';
    this.initialisation();
  }

  initialisation() // Map's initalisation with Leaflet
  {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1Ijoic3RhcmJvc3NtYW4iLCJhIjoiY2s0aDZpcTV0MTB5YzNxbjZ0NnhscDl6MiJ9.WVui8a0N0vXf0tlSH2TY1g'
    }).addTo(this.map);
  }

  ajaxRequest()
  {
    let oXhr = new XMLHttpRequest(); // objects to interact with servers, without having to do a full page refresh.
    oXhr.onload = this.ajaxOnLoad.bind(this);
    
    oXhr.onerror = function (data) 
    {
      console.log('Erreur ...');
    }
    oXhr.open('GET', this.url);
    oXhr.send();
  }

  ajaxOnLoad(e)
  {
    let data = JSON.parse(e.target.responseText); // method parses a JSON string who returns the text received from a server following a request being sent.

    for (var i = 0; i < data.length; i++) 
    {
      if (data[i].status == "CLOSED" || data[i].available_bikes == 0){
        this.chosenIcon = this.redIcon;   
      }
      else if (data[i].status == "OPEN" && data[i].available_bikes >= 6){
        this.chosenIcon = this.greenIcon;
      }
      else if (data[i].status == "OPEN" && data[i].available_bikes <= 5){
        this.chosenIcon = this.orangeIcon;
      }
      let marker = L.marker([data[i].position.lat,data[i].position.lng], {icon :this.chosenIcon});
      this.markers.addLayer(marker); //adds the given layer to the map
      marker.stationData = data[i];
      marker.bindPopup("Station "+ data[i].name +"</br>"+ "La Station est : " + data[i].status + "</br>" + "Il reste : " + data[i].available_bikes + " vélos."); // Add a popup to every markers
      
      marker.on("click", function(e) // leaflet's event
      {
        let data = e.target.stationData;
        reservation.createForm(data);
        document.getElementById("section_canvas").classList.add("not_visible");
        document.getElementById("section_reservation").classList.add("not_visible");
        canvas.clearCanvas();
      });
    }
    this.markers.addTo(this.map);
  }
}
let mymap = new Map();
mymap.ajaxRequest();