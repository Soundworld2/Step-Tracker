const goal = 70000;

let entries = [];

const entriesWrapper = document.querySelector("#entries");
document.querySelector("#target").innerText = goal;

function addNewEntry(newEntry){
    entriesWrapper.removeChild(entriesWrapper.firstElementChild);
    const listItem = document.createElement('li');
    const listValue = document.createTextNode(newEntry);
    listItem.appendChild(listValue);
    entriesWrapper.appendChild(listItem);
}

function reducer(total, currentValue){
    return total + currentValue;
}

function calcTotal(){
    const totalValue = entries.reduce(reducer);
    document.getElementById("total").innerText = totalValue;
    document.getElementById("progressTotal").innerText = totalValue;
    if (entries.length > 6){
        entries.shift();
    }
}

function calcAverage(){
    const average = entries.reduce(reducer) / entries.length;
    document.getElementById("average").innerText = average.toFixed(1);
}

function weeklyHigh(){
    const high = Math.max(...entries);
    document.getElementById("high").innerText = high;
}

function calcGoal(){
    const totalValue = entries.reduce(reducer);
    const completedPercentage = totalValue / (goal / 100);
    const progressCircle = document.querySelector("#progressCircle");
    if (completedPercentage > 100) completedPercentage === 100;
    progressCircle.style.background = `conic-gradient(#70db70 ${completedPercentage}%, grey ${completedPercentage}100%)`;
}

function handleSubmit(event){
    event.preventDefault();
    const entry = Number(document.querySelector("#entry").value);
    if (!entry) return;
    document.querySelector("form").reset();
    entries.push(entry);
    addNewEntry(entry);
    calcTotal();
    calcAverage();
    weeklyHigh();
    calcGoal();
}

const form = document.querySelector('form').addEventListener("submit", handleSubmit);