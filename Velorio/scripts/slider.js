class Slider {
	constructor() {
		this.left = document.getElementById("button_left");
		this.right = document.getElementById("button_right");
		this.pause = document.getElementById("button_pause");
		this.play = document.getElementById("button_play");
		this.images = document.querySelectorAll(".slider_image");
		this.currentImage = 0;
		this.speed = 5000;
		this.slideAuto = null;
		this.initControls();
	}

	reset() { // Method for handle the slider display (keep one if Js is off)
		for (let i = 0; i < this.images.length; i++) {
			this.images[i].classList.add("not_visible");
		}
		if (this.currentImage === this.images.length) {
			this.currentImage = 0;
		}
		else if (this.currentImage === -1) {
			this.currentImage = this.images.length - 1;
		}
		this.affichage();
	}

	affichage() {
		this.images[this.currentImage].classList.remove("not_visible");
	}

	rightSlide() { // Go to the right
		this.currentImage++;
		this.reset();
	}

	leftSlide() { // Go to the left
		this.currentImage--;
		this.reset();
	}

	clavierSlide(e) { // Method for keyboard
		if (e.key === "ArrowLeft") {
		this.leftSlide();
		} else if (e.key === "ArrowRight") {
		this.rightSlide();
		}
	}

	playSlide() { // Play button
		this.play.classList.add("not_visible");
		this.pause.classList.remove("not_visible");
		this.slideAuto = setInterval(this.rightSlide.bind(this), this.speed);
	}

	pauseSlide() { // Pause button
		this.pause.classList.add("not_visible");
		this.play.classList.remove("not_visible");
		clearInterval(this.slideAuto);
	}

	initControls() { // All events 
		this.right.addEventListener("click", this.rightSlide.bind(this));
		this.left.addEventListener("click", this.leftSlide.bind(this));
		this.play.addEventListener("click", this.playSlide.bind(this));
		this.pause.addEventListener("click", this.pauseSlide.bind(this));
		document.addEventListener("keydown", this.clavierSlide.bind(this));
		this.slideAuto = setInterval(this.rightSlide.bind(this), this.speed);
	}	
}
var sliderVélo = new Slider();