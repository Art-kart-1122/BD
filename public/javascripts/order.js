let fullp;

function getInfo() {
	var cartn = localStorage.getItem('cart');
	console.log(cartn);
 // alert(cartn);
	$(document).ready(()=> {
	//$('#logocart').click(() => {
      $.ajax({
      	url: '/cart/',
      	type: 'POST',
      	data: JSON.parse(cartn) ,
      	dataType: 'json',
      	success: function(data) {
        data= JSON.parse(data);
        cartn=JSON.parse(cartn);
        var html = '';
        var fullPrice=0;
        for (var i = 0; i< data.length; i++) {
            html += '<p>'+data[i].name+' <span class="price">'+cartn[data[i].id]+' * '+data[i].price+'</span></p>'
            fullPrice+=(data[i].price)*(cartn[data[i].id]);

        }
        $('#container').html(html);
        var price= fullPrice;
        $('#total').html(price);
        fullp=fullPrice;
      	}
      });
	//});
});
}
 getInfo();
/*
 function setClient() {
  $(document).ready(() =>{
    $('#sub').click(()=>{
      var client={};
      var login= $('#email').val();
      alert(login);
      //localStorage.setItem('client',JSON.stringify(client));
    })
  })
 }
*/
// setClient();
const email = document.getElementById('email');
const fname = document.getElementById('fname');
const adr = document.getElementById('adr');
const promocode = document.getElementById('promocode');
const phone = document.getElementById('phone');

const list = [email,fname,adr,promocode,phone];

document.getElementById('sub').addEventListener('click', ()=> {
   let flag = true;
   for (let i of list) {
      if(!i.checkValidity() || i.value === '') {
        i.style.border = '2px solid red';
        flag = false;
       } 
       else {
         i.style.border = '2px solid green';
       }
    }
    if(flag) {
      ClientNew();
    }
});


function ClientNew() {
    $(document).ready(()=> {
      /*$('#sub').click(()=>{*/

          var client={};
          var email= $('#email').val();
          var surname=$('#fname').val();
          var geozone=$('#adr').val();
          var sale=$('#promocode').val();
          var phone=$('#phone').val();
          client['email'] = email;
          client['surname'] = surname;
          client['geozone']= geozone;
          client['sale']= sale;
          client['phone']= phone;
          client['price']= fullp;
          localStorage.setItem('client',JSON.stringify(client));
          $.ajax({
            url: '/client/new',
            type: 'POST',
            data: JSON.parse(localStorage.getItem('client')) ,
            dataType: 'text',
            success: function(data) {
            document.getElementById('sub').style.display = "none";
            document.getElementById('sub2').style.display = "block";
            }
           });
          
      
        /*});*/
    });
}


 function GetClientId() {
    $(document).ready(()=> {
      $('#sub2').click(()=>{
          
          $.ajax({
            url: '/client/getId',
            type: 'POST',
            data: JSON.parse(localStorage.getItem('client')) ,
            dataType: 'json',
            success: function(data) {
            data= JSON.parse(data);
            cart1 = JSON.parse(localStorage.getItem('cart'));
            cart1['price']= fullp;
            cart1['id']=data[0].id;
            localStorage.setItem('cart1',JSON.stringify(cart1));
            console.log(localStorage.getItem('cart1'));
            $.ajax({
              url: '/order/fullOrder',
              type: 'POST',
              data: JSON.parse(localStorage.getItem('cart1')) ,
              dataType: 'json',
              success: function(data) {
              data= JSON.parse(data);
              cart1 = JSON.parse(localStorage.getItem('cart1'));
              delete cart1['price'];
              cart1['id']=data.id;
              localStorage.setItem('cart1',JSON.stringify(cart1));
              $.ajax({
                url: '/order/OrderModel',
                type: 'POST',
                data: JSON.parse(localStorage.getItem('cart1')) ,
                dataType: 'text',
                success: function(data) {
                localStorage.clear();
                localStorage.removeItem('cart1');
                localStorage.removeItem('cart');
                localStorage.removeItem('client');
                var x = document.getElementsByClassName("hid-sub");
                 x[0].style.display = "flex";  
                }
              });
              }
             });
            }
           });
          
        });
    });
}
GetClientId();

function returnCatalog() {
  document.location.href="/catalog";
}