class Canvas
{
	constructor() 
	{
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = '#000000'; // Color
        this.ctx.lineWidth = 4; 
        this.draw = false;
        this.mousePosition = {
            x: 0,
            y: 0
        };
        this.lastPosition = this.mousePosition;
        this.canvas.width = 250;
        this.canvas.height = 150;
        this.canvasCleaner = document.getElementById("button_clean");
        this.canvasSign = document.getElementById("button_sign");
        this.distance = 0;
        this.initEvents();
    }

    //Event handler
    initEvents() 
    {
        
        this.canvas.addEventListener("mousedown", function (e) { // Draw on click down
            this.draw = true;
            this.lastPosition = this.getMousePosition(e); 
            e.preventDefault();
        }.bind(this));

        this.canvas.addEventListener("mousemove", function (e) { // Draw on mousemove
            this.mousePosition = this.getMousePosition(e);
            this.canvasDraw();
        }.bind(this));

        document.addEventListener("mouseup", function (e) { // Stop the draw when we quit the canvas's area
            this.draw = false;
        }.bind(this));

        // Touch
        this.canvas.addEventListener("touchstart", function (e) {
            this.draw = true;
            this.lastPosition = this.getTouchPosition(e); 
            e.preventDefault();
        }.bind(this));

        this.canvas.addEventListener("touchmove", function (e) {
            this.mousePosition = this.getTouchPosition(e);
            this.canvasDraw();
        }.bind(this));

        this.canvas.addEventListener("touchend", function (e) {
            this.draw = false;
        }.bind(this));

		// Stop scrolling (touch)
        document.body.addEventListener("touchstart", function (e) {
            if (e.target == this.canvas) {
                e.preventDefault();
            }
        }.bind(this),{passive: false});

        document.body.addEventListener("touchend", function (e) {
            if (e.target == this.canvas) {
                e.preventDefault();
            }
        }.bind(this),{passive: false});

        document.body.addEventListener("touchmove", function (e) {
            if (e.target == this.canvas) {
                e.preventDefault();
            }
        }.bind(this),{passive: false});


        //Clear the canvas
        this.canvasCleaner.addEventListener("click", function (){
            this.clearCanvas();
        }.bind(this));

        // Event on click for the reservation's div
        this.canvasSign.addEventListener("click", function (e) {
                e.preventDefault();
                this.buttonResOnClick();
        }.bind(this),{passive: false});

        

    }

    // Send mouse's coordinates
    getMousePosition(mouseEvent) {
        if (this.draw) {
            var oRect = this.canvas.getBoundingClientRect();// method returns the size of an element and its position relative to the viewport.
            return {
                x: mouseEvent.clientX - oRect.left,
                y: mouseEvent.clientY - oRect.top
            };
        }
    };

    // Send pad's coordinates
    getTouchPosition(touchEvent) {
        var oRect = this.canvas.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - oRect.left,
            y: touchEvent.touches[0].clientY - oRect.top
        };
    }

    // Canvas's drawing
    canvasDraw() {
        if (this.draw) {
            this.ctx.beginPath(); //Start a new way
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y); // Move the starting point to new coordinates
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y); // To connect the last point to new coordinates
            this.ctx.stroke(); // For draw 
            this.distance += Math.sqrt(Math.pow(this.lastPosition.x - this.mousePosition.x , 2) + Math.pow(this.lastPosition.y - this.mousePosition.y , 2)); //Pythagore
            this.lastPosition = this.mousePosition;
            this.checkCanvas();
        }
    };

    // Clean the canvas
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.distance = 0;
        this.canvasSign.classList.add("not_visible");
    }

    // Check canvas minimum write
    checkCanvas(){
    if (this.distance >= 50)
    {
        this.canvasSign.classList.remove("not_visible");
    }
    }

    // Appearance of the reservation's div timer
    buttonResOnClick()
    {
        let sect_reservation = document.getElementById('section_reservation');
        sect_reservation.classList.remove("not_visible");
        document.getElementById("section_canvas").classList.add("not_visible");
        let nameStationReservation = document.getElementById('name_Station');
        sessionStorage.setItem('name_Station', nameStationReservation.innerText);
        document.getElementById('reservation_h2').classList.remove("not_visible");;
        document.getElementById('reservation_p').classList.remove("not_visible");;
        count.startCountdown();
    }
}
var canvas = new Canvas();