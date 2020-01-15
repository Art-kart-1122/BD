function getInfo() {
    var cartn = localStorage.getItem('cart');
    console.log(cartn);
    // alert(cartn);
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
                    html += '<div class="item">\
                      <div class="buttons">\
                        <button class="delete-btn" type="button" name="button" value="' + data[i].id + '">\
                          <img src="/images/del.svg" alt="" width="20px" height="20px"/>\
                        </button>\
                      </div>\
                      <div class="image">\
                        <img src="' + data[i].picture + '" alt="" width="100%" height="100%" />\
                      </div>\
                      <div class="description">\
                        <span>' + data[i].name + '</span>\
                      </div>\
                      <div class="quantity">\
                        <button class="add-btn" type="button" name="button" value="' + data[i].id + '" >\
                          <img  src="/images/add.svg"  width="20px" height="20px" value="' + data[i].id + '"/>\
                        </button>\
                        <input type="text" name="name" value="' + cartn[data[i].id] + '">\
                        <button class="minus-btn" type="button" name="button" value="' + data[i].id + '">\
                          <img src="/images/minus.svg"  width="20px" height="20px"/>\
                        </button>\
                      </div>\
                      <div class="price">Цена одного товара <br>' + data[i].price + '</div>\
                      <div class="total-price">' + (data[i].price) * (cartn[data[i].id]) + '</div>\
                      </div>\
                    </div>  ';
                    fullPrice += (data[i].price) * (cartn[data[i].id]);
                }
                $('#target').html(html);
                var price = '<p>Сума к оплате : ' + fullPrice + '</p>';
                $('#full-price').html(price);
            }
        });

    });
}
getInfo();
//Add();

function Add() {
    $(document).ready(() => {
        $('#target').on('click', '.add-btn', function() {
            let articul = $(this).attr('value');
            let cart;
            if (localStorage.getItem('cart') != null) {
                cart = JSON.parse(localStorage.getItem('cart'));

                if (cart[articul] != undefined) {
                    cart[articul]++;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    getInfo();
                }
            }

        });
    });
}

function Del() {
    $(document).ready(() => {
        $('#target').on('click', '.delete-btn', function() {
            let articul = $(this).attr('value');
            let cart;
            if (localStorage.getItem('cart') != null) {
                cart = JSON.parse(localStorage.getItem('cart'));

                if (cart[articul] != undefined) {
                    delete cart[articul];
                    localStorage.setItem('cart', JSON.stringify(cart));
                    getInfo();
                    location.reload();

                }
            }

        });
    });
}

function Minus() {
    $(document).ready(() => {
        $('#target').on('click', '.minus-btn', function() {
            let articul = $(this).attr('value');
            let cart;
            if (localStorage.getItem('cart') != null) {
                cart = JSON.parse(localStorage.getItem('cart'));

                if (cart[articul] != undefined) {
                    if (cart[articul] > 1) {
                        cart[articul]--;
                        localStorage.setItem('cart', JSON.stringify(cart));
                        getInfo();
                    } else {
                        delete cart[articul];
                        localStorage.setItem('cart', JSON.stringify(cart));
                        getInfo();
                        location.reload();
                    }
                }
            }

        });
    });
}

Add();
Del();
Minus();