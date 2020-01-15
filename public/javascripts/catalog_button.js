function buttonClickfilter(but) {
    var x = document.getElementsByClassName("hid");
    if (but == "on") {
        x[0].style.display = "block";
    } else {
        x[0].style.display = "none";
    }
}

function buttonClickSub(but) {
    var x = document.getElementsByClassName("hid-sub");
    if (but == "on") {
        x[0].style.display = "block";
    } else {
        x[0].style.display = "none";
    }
}


/*function Init(cart){
	if (localStorage.getItem('cart') != null) {
   cart = JSON.parse(localStorage.getItem('cart'));
   }
   else {
   	cart={};
   }
}
var i;
var cart= Init(i);*/




function buttonClickAddInCart(but) {
    var articul = but.value;
    var cart;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    } else {
        cart = {};
    }
    if (cart[articul] != undefined) {
        cart[articul]++;
    } else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    var x = document.getElementsByClassName("hid-sub");

    x[0].style.display = "flex";
}

function CheckCart() {
    if (localStorage.getItem('cart') != null) {
        var cartn = localStorage.getItem('cart');
        /*alert(cartn);*/
        let request = new XMLHttpRequest();
        request.open("GET", "../cart/buy", true);
        //request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(cartn);

    } else {
        request.open("GET", "../cart/buy", true);
        request.send(cartn);
    }
}



/*function pagination() {
	$.ajax({
      	url: '/catalog/count',
      	type: 'GET',
      	data: JSON.parse(cartn) ,
      	dataType: 'json',
      	success: function(data) {
        alert(data);
        data= JSON.parse(data);
        }
    });
}

pagination();*/