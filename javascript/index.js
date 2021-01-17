import { fetchComputers }from './api.js'

class App {

    constructor(){
        this.computers = []
        this.selectedComputer = null
        this.elStatus = document.getElementById('app-status')
        this.elComputerSelect = document.getElementById('computers')
        this.selectedComputer = document.getElementById('selected-computer')
        this.laptopImage = document.getElementById('image-laptop')
        this.laptopName = document.getElementById('laptop-name')
        this.laptoPrice = document.getElementById('laptop-price')
        this.laptopDes = document.getElementById('laptop-des')
        this.imagesrc = document.getElementById("image-laptop");


    }
    onComputerChange(){
        if(parseInt(this.elComputerSelect.value) === -1){
            return 
        }

        this.selectedComputer = this.computers.find(computer =>{
            return computer.id === parseInt(this.elComputerSelect.value)
        })
        console.log(this.selectedComputer)
       // const laptopImage = createElement('img')
       this.laptopName.innerText = this.selectedComputer.name
       this.laptoPrice.innerText = this.selectedComputer.price
       this.laptopDes.innerText = this.selectedComputer.description
       const img = document.createElement("img");
img.src = this.selectedComputer.image;

this.imagesrc.appendChild(img);
       

        
    }

    async init(){
        this.elComputerSelect.addEventListener('change',this.onComputerChange.bind(this))
        this.elStatus.innerText= "loading computers...."
        this.elComputerSelect.disabled = true
        try{
            this.computers = await fetchComputers()
            this.elStatus.innerText = ''
        }
        catch (e) {
this.elStatus.innerText = 'Error!' + e.message

        }
        finally {
          this.elComputerSelect.disabled = false   
        }
        this.render()
       

    }


    render() {
        this.computers.forEach(computer => {
            const elComputer = document.createElement('option')
            elComputer.innerText = computer.name
            elComputer.value = computer.id
            this.elComputerSelect.appendChild(elComputer)
        })


    }
}



new App().init()