class Countdown {
    constructor (duration) 
    {
        this.duration = duration;
        this.text_timer = document.getElementById("timer");
        this.reservation_h2 = document.getElementById("reservation_h2");
        this.reservation_p = document.getElementById("reservation_p");
        this.reservation_station = document.getElementById("reservation_station");
    }

    startCountdown()
    {
        this.reservationEnd = this.obtainEndDate(this.duration);
        sessionStorage.setItem('storedReservationEnd', this.reservationEnd.getTime());
        clearInterval(this.countdownInterval);
        this.countdownInterval = setInterval(this.countDownCalc.bind(this) , 1000);// every seconds we call the function
    }

    obtainEndDate(duration) 
    {
        let date = new Date();
        date.setTime(date.getTime() + duration * 60 * 1000); // add 20 minutes in milliseconds to the timestamp (milliseconds)
        return date;
    }

    countDownCalc() 
    {
        let now = new Date();
        let difference = this.reservationEnd - now;
        if (difference < 0) 
        { // when timer comes to zero
            clearInterval(this.countdownInterval);
            this.text_timer.innerText = "Votre réservation à expiré.";
            alert("Votre réservation à expiré.");
            sessionStorage.removeItem('storedReservationEnd');
            this.reservation_h2.classList.add("not_visible");
            this.reservation_p.classList.add("not_visible");
        } else
        {
            let diff = new Date(difference);
            this.text_timer.innerText = "Votre réservation expirera dans : " + diff.getMinutes() + " minute(s) et " + diff.getSeconds() + " seconde(s).";
            document.getElementById("section_reservation").classList.add("visible");
            this.reservation_station.innerText = sessionStorage.getItem('name_Station');
        }
    }
    reservationCheck() // check if we ve a reservation and show the actual timer
    {
        if (sessionStorage.getItem('storedReservationEnd')) 
        {
            this.reservationEnd = new Date(parseInt(sessionStorage.getItem('storedReservationEnd'))); // if we ve already a key
            this.countdownInterval = setInterval(this.countDownCalc.bind(this) , 1000); // every seconds we call this function
            document.getElementById("section_form").classList.add("not_visible");
            document.getElementById("section_canvas").classList.add("not_visible");
            document.getElementById("section_reservation").classList.remove("not_visible"); 
        } 
    } 
}
var count = new Countdown(20);
window.onload = count.reservationCheck();