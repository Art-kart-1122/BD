
function ShowModel() {
    $(document).ready(()=> {
      $('#shopping-cart').on('click','.showModel',function() {
        
        let value = $(this).attr('value');
        $.ajax({
        url: '/test/orders/models',
        type: 'POST',
        data: {'id': value} ,
        dataType: 'json',
        success: function(data) {
        data= JSON.parse(data);
        var html='';
        for(i in data) {
           html+='<tr><td>'+data[i].id+'</td><td>'+data[i].name+'</td><td>'+data[i].accessibility+'</td><td>'+data[i].price+'</td><td>'+data[i].quantity+'</td></tr>';
        }
        
        var id= '#cart'+ value;
        $(id).html(html);
       }
      });
    });
  });
}

ShowModel();

function DoneOrder() {
    $(document).ready(()=> {
      $('#shopping-cart').on('click','.done',function() {
        
        let value = $(this).attr('value');
        var id="done"+value;
        document.getElementById(id).style.backgroundColor = "green";
        $.ajax({
        url: '/test/orders/done',
        type: 'POST',
        data: {'id': value} ,
        dataType: 'json',
        success: function(data) {
       }
      });
    });
  });
}

DoneOrder();