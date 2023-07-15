let foodItem = undefined;

// Get menu function
function getMenu(){
    let result = fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
    result.then((data)=> data.json()).then((data)=>{
        foodItem=data;
        let cards = document.getElementById("cards");
        data.forEach(element => {
            let card = document.createElement("div");
            card.id="card";
            card.innerHTML=`
            <div id="cardImg">
                <img src="${element.imgSrc}" alt="">
            </div>
            <div id="cardBody">
                <div id="c1">
                    <h3>${element.name}</h3>
                    <p>$${element.price}</p>
                </div>
                <button id="c2">+</button>
            </div>`;
            cards.appendChild(card);
            
        });
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
    let itemArr = [foodItem[generateRandomInteger(1,24)],
                   foodItem[generateRandomInteger(1,24)],
                   foodItem[generateRandomInteger(1,24)]];
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
           return resolve(obj);       
       },1500)
        
    });
}

function payOrder(obj){
    return new Promise(resolve=>{
        setTimeout(()=>{
            obj.paid=true;
            resolve(obj);
        },1000)
    });
} 

function thankyouFnc() {
    alert('Thank you for eating with us today!');
    console.log('Thank you for eating with us today!');
}

async function main(){
    await getMenu();
    
    const order = await takeOrder();
    console.log('after 2500ms Order:', order);

    const prepStatus = await orderPrep();
    console.log('after 1500ms Preparation:', prepStatus);

    const paymentStatus = await payOrder(prepStatus);
    console.log('after 1000ms Payment:', paymentStatus);
    thankyouFnc();
}

main();