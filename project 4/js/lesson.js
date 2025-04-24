
const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const krwInput = document.querySelector('#krw');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement1, targetElement2, targetElement3) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/convertor.json");
        request.setRequestHeader("Content-type", "application/json");
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);

            if (element.id === "som") {
                targetElement1.value = (element.value / data.usd).toFixed(2); // в USD
                targetElement2.value = (element.value / data.eur).toFixed(2); // в EUR
                targetElement3.value = (element.value * data.krw).toFixed(2); // в KRW
            }

            if (element.id === "usd") {
                targetElement1.value = (element.value * data.usd).toFixed(2); // в СОМ
                targetElement2.value = (element.value * data.usd / data.eur).toFixed(2); // в EUR
                targetElement3.value = (element.value * data.usd / data.krw).toFixed(2); // в KRW
            }

            if (element.id === "eur") {
                targetElement1.value = (element.value * data.eur).toFixed(2); // в СОМ
                targetElement2.value = (element.value * data.eur / data.usd).toFixed(2); // в USD
                targetElement3.value = (element.value * data.eur / data.krw).toFixed(2); // в KRW
            }

            if (element.id === "krw") {
                targetElement1.value = (element.value / data.krw).toFixed(2); // в СОМ
                targetElement2.value = (element.value * data.krw / data.usd).toFixed(2); // в USD
                targetElement3.value = (element.value * data.krw / data.eur).toFixed(2); // в EUR
            }
        }
    }
}

converter(somInput, usdInput, eurInput, krwInput);
converter(usdInput, somInput, eurInput, krwInput);
converter(eurInput, somInput, usdInput, krwInput);
converter(krwInput, somInput, usdInput, eurInput);

//
const nextButton = document.querySelector("#btn-next")
const prevButton = document.querySelector("#btn-prev")
const cardBlock = document.querySelector(".card")

let cardIndex = 0

function updateCard(cardIndex) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardIndex}`)
        .then((response) => response.json())
        .then((data) => {
            const { title, completed, id } = data
            cardBlock.innerHTML =
                `<p>${title}</p>
                <p style="color: ${completed ? 'green' : 'red'}">${completed}</p>
                <span>${id}</span>`
        })
}

nextButton.onclick = () => {
    cardIndex++
    if (cardIndex > 200){
        cardIndex = 1
    }
    updateCard(cardIndex);
}

prevButton.onclick = () => {
    cardIndex--;
    if(cardIndex < 1) {
        cardIndex = 200
    }
    updateCard(cardIndex);
}