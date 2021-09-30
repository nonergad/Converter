let memory = 0;
let changeCur = 'USD';
let text = ''
    setTimeout(function(){ 
        async function start(){
        document.querySelector('.load-block').style.display = 'flex'
        const res = await fetch(`https://api.exchangerate.host/latest?base=RUB`);
        document.querySelector('.load-block').style.display = 'none'
        const data = await res.json();
        memory = data.rates
        rate.innerText = `1 RUB = ${memory[changeCur]} ${changeCur}`;
        rateChange.innerText = `1 ${changeCur} = ${1/memory[changeCur]} RUB`;
        document.querySelector('#newMoney').value = 1*memory[changeCur];
    }
    start()
    }, 50);
const rate = document.querySelector('#baseRate');
const rateChange = document.querySelector('#newRate');
const baseInput = document.querySelector('#baseMoney')
baseInput.addEventListener('keyup',calcCur);
const newInput = document.querySelector('#newMoney');
newInput.addEventListener('keyup',calcCur);
const curArr = ['CHF','NOK','CAD',,'MXN','CNY','ISK','KRW','HKD','CZK','BGN','BRL','USD','IDR','SGD','PHP','RON','HUF','ILS','THB','SEK','NZD','AUD','DKK','HRK','PLN','TRY','INR','MYR','ZAR','JPY']
const select = document.querySelectorAll('select')
select.forEach(element => {
    if (element.parentElement == document.querySelector('.curChoose')){
        element.addEventListener('change',getRates)
    } else {
        element.addEventListener('change',setChange)
    }
    curArr.forEach(el => {
        const option = document.createElement('option')
        option.innerText = el
        element.append(option);
    });
});

const allButtons = document.querySelectorAll('div.currency');
function curPick() {
    allButtons.forEach(element => {
        if (element.parentElement == document.querySelector('#choose')) {
            element.addEventListener('click',getRates)
            if (element.innerText == 'RUB'){
                element.style.backgroundColor = '#833AE0'
                element.style.color = 'white';
            }
        } else {
            element.addEventListener('click',setChange)
            if (element.innerText == 'USD'){
                element.style.backgroundColor = '#833AE0'
                element.style.color = 'white';
            }
        }
    });
}
curPick()

async function getRates(event) {
    if (event.currentTarget.classList.contains('curSelect')){
        text = event.currentTarget.value;
        allButtons.forEach(element => {
            if (element.parentElement == document.querySelector('#choose')) {
            element.style.backgroundColor = 'white';
            element.style.color = '#C6C6C6';
            }
            event.currentTarget.style.backgroundColor = '#833AE0'
            event.currentTarget.style.color = 'white';
        })
    } else {
        allButtons.forEach(element => {
            if (element.parentElement == document.querySelector('#choose')) {
                element.style.backgroundColor = 'white';
                element.style.color = '#C6C6C6';
            }
        });
        select.forEach(element => {
            if (element.parentElement == document.querySelector('#choose')){
                element.style.backgroundColor = 'white';
                element.style.color = '#C6C6C6';
            }
        })
        event.currentTarget.style.backgroundColor = '#833AE0'
        event.currentTarget.style.color = 'white';
        text = event.currentTarget.innerText;
    }
    if (event.currentTarget.innerText == changeCur) {
        rate.innerText = `1 ${text} = 1 ${changeCur}`;
        rateChange.innerText = `1 ${changeCur} = 1 ${text}`;
    } else {
        const res = await fetch(`https://api.exchangerate.host/latest?base=${text}`);
        const data = await res.json();
        memory = data.rates
        rate.innerText = `1 ${text} = ${memory[changeCur]} ${changeCur}`;
        rateChange.innerText = `1 ${changeCur} = ${1/memory[changeCur]} ${text}`;
    }
}

function setChange(event){
    if (event.currentTarget.classList.contains('curSelect')){
        changeCur = event.currentTarget.value
        allButtons.forEach(element => {
            if (element.parentElement !== document.querySelector('#choose')) {
            element.style.backgroundColor = 'white';
            element.style.color = '#C6C6C6';
            }
            event.currentTarget.style.backgroundColor = '#833AE0'
            event.currentTarget.style.color = 'white';
        });
    } else {
        allButtons.forEach(element => {
            if (element.parentElement !== document.querySelector('#choose')) {
            element.style.backgroundColor = 'white';
            element.style.color = '#C6C6C6';
            }
        });
        select.forEach(element => {
            if (element.parentElement !== document.querySelector('#choose')){
                element.style.backgroundColor = 'white';
                element.style.color = '#C6C6C6';
            }
        })
        event.currentTarget.style.backgroundColor = '#833AE0'
        event.currentTarget.style.color = 'white';
        changeCur = event.currentTarget.innerText;
    }
    rate.innerText = `1 ${text} = ${memory[changeCur]} ${changeCur}`;
    rateChange.innerText = `1 ${changeCur} = ${1/memory[changeCur]} ${text}`;
}

function calcCur(event) {
    const baseMoney = document.querySelector('#baseMoney');
    const newMoney = document.querySelector('#newMoney');
    if(baseMoney.value == ''){
        baseMoney.value = 1;
        newMoney.value = 1*memory[changeCur];
    } else{
        if (event.currentTarget.id == 'baseMoney') {
            newMoney.value = baseMoney.value*memory[changeCur]
        } else {
            baseMoney.value = newMoney.value/memory[changeCur]
        }
    }
}