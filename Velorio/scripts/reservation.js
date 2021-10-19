class Reservation
{
	constructor()
	{
    this.section_form_p = document.getElementById('section_form_p');
		this.section_form = document.getElementById('section_form');
		this.form = document.getElementById('form');
		this.adressStation = document.getElementById('adress_Station');
		this.availableBikes = document.getElementById('available_bikes');
		this.availableBikeStands = document.getElementById('bike_stands');
		this.nameStation = document.getElementById('name_Station');
    this.statusStation = document.getElementById('status_Station');

    this.form.addEventListener('submit',function(e) //To avoid the page to refresh
    {
      e.preventDefault();
      reservation.onClic();
    });
	}
	createForm(x) // Method for create the form from #section_form
	{  
      if (x.status == "OPEN")
          {
            this.statusStation.innerText = "La station est actuellement : Ouverte !";
            if(x.available_bikes > 0)
            {
              this.form.classList.remove("not_visible");
            }
            else if ( x.available_bikes == 0)
            {
              this.form.classList.add("not_visible");
            }
          } else if (x.status == "CLOSED" || x.available_bikes == 0)
          {
            this.statusStation.innerText = "La station est actuellement : Fermée !";
            this.form.classList.add("not_visible");
          }
      this.section_form_p.classList.add("not_visible");
      this.adressStation.innerText = x.address;
      this.nameStation.innerText = x.name; 
      this.availableBikes.innerText = x.available_bikes + " vélo(s) disponible(s)";
      this.availableBikeStands.innerText = x.available_bike_stands + " place(s) disponible(s)";
      this.section_form.classList.remove("not_visible");
  }

  onClic() // Save the name and first name & make visible canvas's section
  {
    storage.save();
    let section_canvas = document.getElementById('section_canvas');
    section_canvas.classList.remove("not_visible");
  }
}
var reservation = new Reservation();