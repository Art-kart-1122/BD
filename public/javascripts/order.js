let fullp;

function getInfo() {
    var cartn = localStorage.getItem('cart');
    console.log(cartn);
    $(document).ready(() => {
        $.ajax({
            url: '/cart/',
            type: 'POST',
            data: JSON.parse(cartn),
            dataType: 'json',
            success: function(data) {
                data = JSON.parse(data);
                cartn = JSON.parse(cartn);
                var html = '';
                var fullPrice = 0;
                for (var i = 0; i < data.length; i++) {
                    html += '<p>' + data[i].name + '\
                     <span class="price">' + cartn[data[i].id] + ' * \
                     ' + data[i].price + '</span></p>';
                    fullPrice += (data[i].price) * (cartn[data[i].id]);
                }
                $('#container').html(html);
                var price = fullPrice;
                $('#total').html(price);
                fullp = fullPrice;
            }
        });

    });
}
getInfo();

const email = document.getElementById('email');
const fname = document.getElementById('fname');
const adr = document.getElementById('adr');
const promocode = document.getElementById('promocode');
const phone = document.getElementById('phone');

const list = [email, fname, adr, promocode, phone];

document.getElementById('sub').addEventListener('click', () => {
    let flag = true;
    for (let i of list) {
        if (!i.checkValidity() || i.value === '') {
            i.style.border = '2px solid red';
            flag = false;
        } else {
            i.style.border = '2px solid green';
        }
    }
    if (flag) {
        ClientOrder();
    }
});


function ClientOrder() {
    $(document).ready(() => {
        var client = {};
        client['email'] = $('#email').val();
        client['surname'] = $('#fname').val();
        client['geozone'] = $('#adr').val();
        client['sale'] = $('#promocode').val();
        client['phone'] = $('#phone').val();;
        client['price'] = fullp;
        localStorage.setItem('client', JSON.stringify(client));
        $.ajax({
            url: '/client/new',
            type: 'POST',
            data: JSON.parse(localStorage.getItem('client')),
            dataType: 'json',
            success: function(data) {
                var id_order = JSON.parse(data);
                if (id_order[0][0].id === undefined) {
                 var x = document.getElementsByClassName("hid-fail");
                 x[0].style.display = "flex";
                }
                else{
                cart = JSON.parse(localStorage.getItem('cart'));
                cart['id'] = id_order[0][0].id;
                localStorage.setItem('cart', JSON.stringify(cart));
                OrderModel();
              }
            }
        });
    });
}

/*
function GetClientId() {
    $(document).ready(() => {
        $.ajax({
            url: '/client/getId',
            type: 'POST',
            data: JSON.parse(localStorage.getItem('client')),
            dataType: 'json',
            success: function(data) {
                data = JSON.parse(data);
                cart1 = JSON.parse(localStorage.getItem('cart'));
                cart1['price'] = fullp;
                cart1['id'] = data[0].id;
                localStorage.setItem('cart1', JSON.stringify(cart1));
                OrderModel();
            }
        });
    });
}
*/
function OrderModel() {
    $(document).ready(() => {
        $.ajax({
            url: '/order/OrderModel',
            type: 'POST',
            data: JSON.parse(localStorage.getItem('cart')),
            dataType: 'text',
            success: function(data) {
              alert(data);
              if(JSON.parse(data) == "ok") {
                localStorage.clear();
                localStorage.removeItem('cart1');
                localStorage.removeItem('cart');
                localStorage.removeItem('client');
                var x = document.getElementsByClassName("hid-sub");
                x[0].style.display = "flex";
              }
                else {
                  var x = document.getElementsByClassName("hid-fail");
                  x[0].style.display = "flex";  
                }
            }
        });
    });
}
/*
function Order() {
    $.ajax({
        url: '/order/fullOrder',
        type: 'POST',
        data: JSON.parse(localStorage.getItem('cart1')),
        dataType: 'json',
        success: function(data) {
            c
            localStorage.setItem('cart1', JSON.stringify(cart1));
            OrderModel();
        }
    });
}
*/
function returnCatalog() {
    document.location.href = "/catalog";
}