let foodItem = undefined;
let foodItemArr = undefined;
let cardsContainer = undefined;
// Get menu function
function getMenu(){
    let result = fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
    result.then(data => data.json()).then(data=>{
        foodItem=data;
        cardsContainer = document.getElementById("cards");
       foodItemArr = data.map(element => {
            let card = document.createElement("div");
            card.className="card";
            card.innerHTML=`
            <div class="cardImg">
                <img src="${element.imgSrc}" alt="">
            </div>
            <div class="cardBody">
                <div class="c1">
                    <h3>${element.name}</h3>
                    <p>$${element.price}</p>
                </div>
                <button class="c2" onclick="addToMap(this)">+</button>
            </div>`;
            cardsContainer.appendChild(card);

            return {
                foodName:element.name,
                cardDiv : card
            }
            
        });
        // console.log(foodItemArr);
      
      
    })
    .catch((data)=>{
        console.log("Failed",data);
    })
};

function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }
//Random 3 food Items
function addRandomItem(){
    let itemArr = [foodItem[0],
                   foodItem[1],
                   foodItem[2]];
    return itemArr
}

function takeOrder(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            let randomItem = addRandomItem();
            let obj = {randomItem};
           

            resolve(obj);
        },2500)
    });
}

function orderPrep(){
    return new Promise(resolve=>{
       setTimeout(()=>{
           let obj ={ order_status:true,paid:false};
           sec4.innerHTML= "PREPARING ORDER";
            sec4.style.color = "orange";
            document.querySelector("#sec5 h6").style.color="green";
           return resolve(obj);       
       },1500)
        
    });
}

function payOrder(obj){
    return new Promise(resolve=>{
        setTimeout(()=>{
            obj.paid=true;
            sec4.innerHTML= "ORDER COMPLETE";
            sec4.style.color = "green";
            resolve(obj);
        },1000)
    });
} 

function thankyouFnc() {
    sec4.innerHTML= "Welcome";
    sec4.style.color = "red";
    document.querySelector("#sec5 h6").innerHTML="";
    document.querySelector("#sec5 h6").style.fontSize="1vw";
    alert('Thank you for eating with us today!');
    console.log('Thank you for eating with us today!');
    orderMap.clear();
    searchVal.value = "";

}

async function main(){
    await getMenu();
    
    // const order = await takeOrder();
    // console.log('after 2500ms Order:', order);

    // const prepStatus = await orderPrep();
    // console.log('after 1500ms Preparation:', prepStatus);

    // const paymentStatus = await payOrder(prepStatus);
    // console.log('after 1000ms Payment:', paymentStatus);
    // thankyouFnc();
}

main();

let searchBox = document.getElementById("searchVal");
searchBox.addEventListener('input',searchFood);
function searchFood(e) {

    let val = e.target.value.toLowerCase();
    // console.log(val);
    foodItemArr.forEach((food)=>{
        const isVisible = food.foodName.toLowerCase().includes(val);
        food.cardDiv.classList.toggle("hide" , !isVisible)
    })
}

let orderMap = new Map();

function addToMap(elem) {
    let key = elem.previousElementSibling.children[0].innerText;
    let price =  elem.previousElementSibling.children[1].innerText;
    price=parseFloat(price.slice(1,price.length))
    // console.log(price);
    if(orderMap.has(key)){
      let count = orderMap.get(key).qty;
      count++;
      orderMap.set(key,{qty:count,amt:price});
    }else{
        orderMap.set(key,{qty:1,amt:price});
    }
    // console.log(orderMap);

    renderOrder(orderMap);
}
// function showOrders(){
    
// }
function renderOrder(map) {
    sec4.innerHTML= "ORDER TAKEN";
    sec4.style.color = "black";
    let sum =0;
   map.forEach( (value ) => {
        sum += value.amt*value.qty;
      })
      ordList.innerHTML="";
    map.forEach( (value,key ) => {
        let lii = document.createElement("li");
        let tot=value.amt*value.qty;
        lii.innerHTML = `${key} X ${value.qty} = ${tot.toFixed(2)}`
        ordList.appendChild(lii);
      })
      ordSum.innerHTML=`Total Bill Amount = ${sum.toFixed(2)}$`
    
}
function pay(el){
    if(el.innerText === "Confirm"){

        el.innerText = "Pay"
        document.querySelector("#sec5 ol").style.color = 'green'
    }

     else{
        el.innerText = "Confirm"
        ordSum.innerHTML=`Paid`
        ordSum.style.color = 'green'
        ordSum.style.fontSize = '1.5vw';
        ordList.innerHTML="";
        setTimeout(thankyouFnc,2000)
     }
}
