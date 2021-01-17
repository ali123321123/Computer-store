import { fetchComputers }from './api.js'

class App {

    constructor(){
        this.computers = []
        this.selectedComputer = null
        this.currency = null
        this.getmoreloan = true
        this.elStatus = document.getElementById('app-status')
        this.elComputerSelect = document.getElementById('computers')
        this.selectedComputer = document.getElementById('selected-computer')
        this.laptopImage = document.getElementById('image-laptop')
        this.laptopName = document.getElementById('laptop-name')
        this.laptoPrice = document.getElementById('laptop-price')
        this.laptopDes = document.getElementById('laptop-des')
        this.imagesrc = document.getElementById("image-laptop");
        this.balanceEl = document.getElementById("balance")
        this.getloanBtn = document.getElementById("getloan-btn")
        this.loanAmount = document.getElementById("loan-amount")
        this.outstandingloanList = document.getElementById("outstandingloan-list")
        this.workingMoney = document.getElementById("working-money")
        this.bankBtn = document.getElementById("bank-button")
        this.workBtn = document.getElementById("work-btn")
        this.repayLoanEl = document.getElementById("repay-a-loan")
        this.buyBtn = document.getElementById("buy-btn")
        this.laptopImage = document.getElementById("laptop-image")
        this.featurelaptop = document.getElementById("feature-laptop")
        this.featList = document.getElementById("feat-list")
        this.feau1El =  document.getElementById("feau1")
        this.feau1E2 =  document.getElementById("feau2")
        this.feau1E3 =  document.getElementById("feau3")
        this.feau1E4 =  document.getElementById("feau4")
        

    }
    onComputerChange(){
       
       
       
        this.selectedComputer = this.computers.find(computer =>{
            return computer.id === parseInt(this.elComputerSelect.value)
        })
        console.log(this.selectedComputer)
       // const laptopImage = createElement('img')
       this.laptopName.innerText = this.selectedComputer.name
       this.laptoPrice.innerText = this.selectedComputer.price
       this.laptopDes.innerText = this.selectedComputer.description
       this.laptopImage.src = this.selectedComputer.image
       this.feau1El.innerText = this.selectedComputer.spec[0]
       this.feau1E2.innerText = this.selectedComputer.spec[2]
       this.feau1E3.innerText = this.selectedComputer.spec[3]
       this.feau1E4 .innerText = this.selectedComputer.spec[4]
       this.buyBtn .hidden = false
       this.featurelaptop.innerText =" Feature:"
       this.featList.hidden = false
       
       /*const img = document.createElement("img");
       img.src = this.selectedComputer.image;
      
       this.imagesrc.appendChild(img);
       */
             
    }


getloan(){

    if(this.getmoreloan){
    let desiredLoan = prompt("Please enter Desired Loan Amount");
    if (desiredLoan == null || desiredLoan == "" || isNaN(desiredLoan)) {
      alert("you should write a")
    } 
   else if(desiredLoan > (parseInt( this.balanceEl.innerText)* 2  ) ){
        alert("You can not get a loan grater than your bank balance")
    }
    else{
        alert("you can get a loan, you can check your loan in outstanding loan")
        this.loanAmount.innerText =desiredLoan 
        this.outstandingloanList.hidden = false
        this.repayLoanEl.hidden = false
        this.getmoreloan = false       
    }
    }
    else {
        alert("you should pay a laptop first to get more loan")
    }
}
    //document.getElementById("demo").innerHTML = txt;


    transferMoney(){
        let balanceamount  = parseInt(this.balanceEl.innerText)
        let workingmoney   = parseInt(this.workingMoney.innerText)
      let outstandingloadn = parseInt(this.loanAmount.innerText)

      if(outstandingloadn >0){
        let moneyToPay = 0.1 * workingmoney
        workingmoney -= moneyToPay
        outstandingloadn -= moneyToPay
        this.loanAmount.innerText = outstandingloadn
      }

      this.balanceEl.innerText =  balanceamount + workingmoney
      this.workingMoney.innerText = 0 
    }

    increasePay(){
     let workingMoneyAmount = parseInt (this.workingMoney.innerText)
     workingMoneyAmount  += 100
     this.workingMoney.innerText = workingMoneyAmount 

    }


    repayLoan(){
        console.log("repay")
    let workingmoney = parseInt (this.workingMoney.innerText)
    console.log(workingmoney)
    let outstandingloadn = parseInt(this.loanAmount.innerText)
    console.log(outstandingloadn)
    let newLoan = outstandingloadn - workingmoney 

    this.loanAmount.innerText = newLoan 
    this.workingMoney.innerText = 0
    }

    buyLaptop(){
   let balance  = parseInt(this.balanceEl.innerText)
   let comPrice = parseInt (this.laptoPrice.innerText)
     
   if(balance < comPrice){
       alert("your balance is not enough to buy this laptop")
   }
   else{
    this.balanceEl.innerText =  balance - comPrice
    this.getmoreloan = true
    alert("You bought a new laptop")
   }

    }






    async init(){
        this.currency = this.balanceEl.innerText
        this.balanceEl.innerText =2000
        this.workingMoney.innerText = 500
        this.elComputerSelect.addEventListener('change',this.onComputerChange.bind(this))
        this.getloanBtn.addEventListener('click',this.getloan.bind(this))
        this.bankBtn.addEventListener('click',this.transferMoney.bind(this))
        this.workBtn .addEventListener('click',this.increasePay.bind(this))
        this.repayLoanEl.addEventListener('click',this.repayLoan.bind(this))
        this.buyBtn.addEventListener('click',this.buyLaptop.bind(this))
        this.elStatus.innerText= "loading computers...."
        this.elComputerSelect.disabled = true
        this.outstandingloanList.hidden = true
        this.repayLoanEl.hidden = true
        this.buyBtn .hidden = true
        this.featList.hidden = true

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