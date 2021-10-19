class Storage
{
	constructor()
	{
		this.firstName = document.getElementById('firstName');
		this.name = document.getElementById('name');
		this.storage_name = localStorage.getItem('name');
		this.storage_firstName = localStorage.getItem('firstName');
		this.init();
	}

	init()
	{
		if(this.storage_name && this.storage_firstName)
		{
			this.name.value = this.storage_name;
			this.firstName.value = this.storage_firstName;
		}
	}

	save()
	{
		localStorage.setItem('name', this.name.value);
		localStorage.setItem('firstName', this.firstName.value);
	}
}
var storage = new Storage();