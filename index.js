import { menuArray } from "./data.js";

const menuEl = document.getElementById("menu-el")
const orderEl = document.getElementById("order-el")
const orderArray = []

renderMenu()

menuEl.addEventListener("click", function(e){
    const targetEl = e.target
    if (targetEl.classList.contains("add-item-btn")){
        addItemToOrder(targetEl.dataset.id)
    }
    else if (targetEl.parentElement.classList.contains("add-item-btn")){
        addItemToOrder(targetEl.parentElement.dataset.id)
    }
    renderOrder()
})

function addItemToOrder(itemId){
    if (orderArray.length === 0){
        orderEl.parentElement.classList.remove("hidden")
    }
    orderArray.push(menuArray[itemId])
}

function renderOrder(){
    orderEl.innerHTML = orderArray.reduce(function(innerHTML, currentItem){
        const {name, price} = currentItem
        return innerHTML + `
            <div class="order-line">
                    <p class="big-text">${name}</p>
                    <button class="remove-item-btn">remove</button>
                    <p class="item-price align-right">$${price}</p>
            </div>
        `
    },"")
}

function renderMenu(){
    menuEl.innerHTML = menuArray.reduce(function(innerHTML, currentItem){
        const {name, ingredients, id, price, emoji} = currentItem
        return innerHTML + `<div class="menu-item">
                    <p class="item-graphic">${emoji}</p>
                    <div>
                        <p class="big-text">${name}</p>
                        <p class="item-ingredients">${ingredients.join(", ")}</p>
                        <p class="item-price">$${price}</p>
                    </div>
                    <button class="add-item-btn align-right" data-id="${id}">
                        <i class="fa-regular fa-plus"></i>
                    </button>
                </div>`
    },"")
}