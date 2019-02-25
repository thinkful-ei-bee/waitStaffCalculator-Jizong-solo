'use strict';



let DATA = [];

function addEntry(newBasePrice, newTaxRate,newTipPercentage) {
  DATA.push({newBasePrice, newTaxRate,newTipPercentage});
}


function generateRightColumnBoxes(){
    console.log('generate html element for the right column');
}

function renderCalculator(){
    console.log('`renderCalculator` ran');
    // subtotal,tip,total
    let hccArray = handleCustomerCharge();
    // tip total,meal count,average tip per meal
    let hmeArray = handleMyEarningInfo();
    console.log('testing charge',handleCustomerCharge());

    $('.result-display-column').html(
        `<div class="customer-charge-box">
        <div class = "box box-top">
            <h2>Customer Charges</h2>
        </div>    

        <div class = "box box-details">
            <p>Subtotal: <span>${hccArray[0]}</span></p>
            <p>Tip: <span>${hccArray[1]}</span></p>
            <hr>
            <p>total: <span>${hccArray[2]}</span></p>
        </div>
    </div>
<!---->
    <div class = "earning-info-box">
    
            <div class = "box box-top">
                <h2>My Earnings Info</h2>
            </div>   
            <div class = "box box-details">
                    <p>Tip Total: <span>${hmeArray[0]}</span></p>
                    <p>Meal count: <span>${hmeArray[1]}</span></p>            
                    <p>Average Tip Per Meal: <span>${hmeArray[2]}</span></p>
                </div>
               
            </div>
`
    );
}


function resetData(){
    console.log('`resetData` ran');
    $('#reset-data').on('click',function(event){
        DATA=[];
        renderCalculator();

    });
}
        

function handleEnterMealDetails(){
    console.log('`handleEnterMealDetails` ran');
    $('#js-enter-meal-details-form').submit(function(event){
        event.preventDefault();
        const newBasePrice = Number($('.js-base-meal-price-entry').val());
        $('.js-base-meal-price-entry').val('');
        const newTaxRate = Number($('.js-tax-rate-entry').val());
        $('.js-tax-rate-entry').val('');
        const newTipPercentage = Number($('.js-tip-percentage').val());
        $('.js-tip-percentage').val('');
        console.log('new entry',newBasePrice,newTaxRate,newTipPercentage);
        addEntry(newBasePrice,newTaxRate*0.01,newTipPercentage*0.01);
        // temp, it will be moved to renderCalculator() later.
        renderCalculator();
        
    });


    // handle meal details entry
    

}

// calculate subtotal 
function calculateSubtotal(basePrice,taxRate){
    console.log('calculate subtotal');
    return basePrice+(basePrice*taxRate);
  }
  
  // calculate tip
  function calculateTip(basePrice,TipPercentage){
    return basePrice*TipPercentage;
  }
  
function customerChargeCalucation(){
    console.log('`customerChargeCalucation` ran');
    if(DATA.length !==0){
        //let subtotal = calculateSubtotal(DATA[DATA.length-1].newBasePrice,DATA[DATA.length-1].newTaxRate);
        console.log('testing data',DATA);
        let subtotal = calculateSubtotal(DATA[DATA.length-1].newBasePrice,DATA[DATA.length-1].newTaxRate);
        console.log('testing subtotal calculation',subtotal);
        let tip = calculateTip(DATA[DATA.length-1].newBasePrice,DATA[DATA.length-1].newTipPercentage);
        console.log('testing tip calcluation',tip);
        let total = subtotal+tip;
        return [subtotal,tip,total];
      } else{
          return [0,0,0];
      }
}

function handleCustomerCharge(){
    console.log('`handleCustomerCharge` ran');
    let resultArray = customerChargeCalucation();
    console.log(resultArray);
    return resultArray;
    
}

function handleMyEarningInfo(){
  // eslint-disable-next-line no-console
  console.log('`handleMyEarningInfo` ran');
  if(DATA.length!==0){
    let tipTotal = 0;
    for (let meal of DATA){
      tipTotal+= meal.newBasePrice*meal.newTipPercentage;
    }
    let mealCount = DATA.length;
    let averageTipPerMeal = tipTotal/mealCount;
    // eslint-disable-next-line no-console
    console.log('testing earning info cal',tipTotal,mealCount,averageTipPerMeal);
    return [tipTotal,mealCount,averageTipPerMeal];
  } else {
    return [0,0,0];
  }    

}


function waitStaff_calculator(){
  handleEnterMealDetails();
  handleCustomerCharge();
  handleMyEarningInfo();
  resetData();
  renderCalculator();
}

$(waitStaff_calculator);