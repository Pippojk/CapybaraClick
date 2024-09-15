let money = 0;
let clickPower = 1;
let autoclickPower = 0;
let upgradeCost = 10;
let autoclickCost = 20;
let skins = {};

document.getElementById('capybara').addEventListener('click', () => {
    money += clickPower;
    document.getElementById('money').innerText = money;



    // Money animation
    const moneyElement = document.createElement('div');
    moneyElement.classList.add('floating-money');
    moneyElement.innerText = `+ $${clickPower}`;
    document.body.appendChild(moneyElement);

    setTimeout(() => {
        moneyElement.remove();
    }, 1000);
});

document.querySelectorAll(".cl").forEach(div =>{
    div.addEventListener('click', () => {
        let price = parseInt(div.getAttribute('data-price'), 10);
        let value = parseInt(div.getAttribute('data-value'), 10);
        if (money >= price) {
            money -= price;
            clickPower+=value;

            document.getElementById('money').innerText = money;
            document.getElementById('click-power').innerText = clickPower;
        }
    }); 
})
    

let autoclickInterval = null;  // Variabile per memorizzare l'interval

document.querySelectorAll(".au").forEach(div => {
    div.addEventListener('click', () => {
        let price = parseInt(div.getAttribute('data-price'), 10);
        let value = parseInt(div.getAttribute('data-value'), 10);
        
        if (money >= price){
            money -= price;
            autoclickPower += value; // Aumenta il costo del prossimo upgrade di autoclick
            console.log(autoclickPower);
            document.getElementById('money').innerText = money;
            
            document.getElementById('Money_per_second').innerText = autoclickPower;  // Aggiorna la visualizzazione del potere dell'autoclick

            // Inizia o aggiorna l'intervallo per l'autoclick
            if (!autoclickInterval){  // Se l'intervallo non è già stato avviato
                autoclickInterval = setInterval(() => {
                    money += autoclickPower;  // Aggiungi denaro in base all'autoclick power
                    document.getElementById('money').innerText = money;
                }, 1000);  // Ogni secondo
            }
        }
    });
})
    

// Handle click event for the "Buy" buttons in the shop
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const skin = button.getAttribute('data-skin');
        const price = parseInt(button.getAttribute('data-price'), 10);

        if (money >= price) {
            money -= price;
            skins[skin] = true; // Mark the skin as purchased
            document.getElementById('money').innerText = money;
            button.disabled = true; // Disable the button after purchase
            button.innerText = 'Purchased'; // Change button text

            // Update the skin dropdown
            const dropdown = document.getElementById('skin-dropdown');
            const option = document.createElement('option');
            option.value = skin;
            console.log(skin);
            option.innerText = skin.charAt(0).toUpperCase() + skin.slice(1);
            dropdown.appendChild(option);
        } else {
            alert('Not enough money!');
        }
    });
});

// Handle click event for the "Toggle Shop" button
document.getElementById('toggle-shop-btn').addEventListener('click', () => {
    const shop = document.getElementById('shop');
    if (shop.style.display === 'none' || shop.style.display === '') {
        shop.style.display = 'block'; // Show shop
        document.getElementById('toggle-shop-btn').innerText = 'chiudi Shop'; // Change button text
        document.querySelector(".upgrade-btns").style.display = 'none';
    } else {
        document.querySelector(".upgrade-btns").style.display = 'block';

        shop.style.display = 'none'; // Hide shop
        document.getElementById('toggle-shop-btn').innerText = 'apri Shop'; // Change button text
    }
});

// Handle skin selection
document.getElementById('skin-dropdown').addEventListener('change', (event) => {
    const selectedSkin = event.target.value;
    console.log(selectedSkin);
    if (selectedSkin) {
        document.getElementById('capybara').src = `images/${selectedSkin}.png`; // Update the capibara image based on the selected skin
    }
});