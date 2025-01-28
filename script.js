let BASE_URL = "https://api.exconvert.com/convert?from=USD&to=AUD&amount=1&access_key=21f397de-8b899504-f58af2e2-70444778";


const countries = document.querySelectorAll(".countries select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".fromCurrency");
const toCurr =document.querySelector(".toCurrency");
const msg= document.querySelector(".msg");

for(let select of countries){
    for(let CurrCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = CurrCode;
        newOpt.value = CurrCode;
        if(select.name=== "fromCurrency" && CurrCode === "INR"){
            newOpt.selected = "selected";
        }
        else if(select.name=== "toCurrency" && CurrCode === "USD"){
            newOpt.selected = "selected";
        }
        select.append(newOpt);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);      
    })
}




const updateFlag = (element) => {
    let CurrCode=element.value;
    let countryCode=countryList[CurrCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src = newSrc;
};



const updateRate = async () => {
    let amount = document.querySelector("form input").value;
    if(amount === "" || amount < 1){
        amount=1;
        document.querySelector("form input").value="1";
    }
    if(fromCurr.value === toCurr.value){
        msg.innerText = "Please select different currencies";
        return;
    }
    const URL= `https://api.exconvert.com/convert?from=${fromCurr.value}&to=${toCurr.value}&amount=${amount}&access_key=21f397de-8b899504-f58af2e2-70444778`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.result[toCurr.value];

    let finalAmount = amount * rate;
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateRate();
});

window.addEventListener("load", () => {
    updateRate();
});