$(document).ready(function(){
    console.log("script ready");
    
    var orderlistitems=JSON.parse(localStorage.getItem("productlist"));
    var TotalAmount=0,cartCount=0;

    for(var i=0;i<orderlistitems.length;i++){
        var card=$("<div>").addClass("checkout-card");
        var imageDiv=$("<div>");
        imageDiv.append($("<img>").attr("src",orderlistitems[i].preview).addClass("checkout-product-img"));
        var contentDiv=$("<div>");
        var productTitle=$("<h4>").text(orderlistitems[i].name);
        var productCount=$("<p>").text("Quantity: "+orderlistitems[i].count);
        var amountLable=$("<p>").text("Amount: Rs ");
        amountLable.append($("<span>").text(parseInt(orderlistitems[i].count) * parseInt(orderlistitems[i].price)));
        contentDiv.append(productTitle,productCount,amountLable);
        card.append(imageDiv,contentDiv);
        $("#card-list").append(card);

        cartCount+=orderlistitems[i].count;
        TotalAmount += parseFloat(orderlistitems[i].count) * parseFloat(orderlistitems[i].price);
    }
    $("#cart-count").text(cartCount);
    $("#total-amount").text(TotalAmount);
    $("#item-count").text(orderlistitems.length);

    $('#btn-place-order').click(function() {
        $("#btn-place-order").css({
            "transform": "scale(1.1, 1.1)"   
        })
        setTimeout(function() {
            $("#btn-place-order").css({
                "transform": "scale(1, 1)"   
            })
        }, 200)
        for(var i=0; i<orderlistitems.length; i++) {
            var dataObj = {
                "id": orderlistitems[i].id,
                "brand": orderlistitems[i].brand,
                "name": orderlistitems[i].name,
                "price": orderlistitems[i].price,
                "preview": orderlistitems[i].preview,
                "amount":TotalAmount,
                "isAccessory": orderlistitems[i].isAccessory
            }
        }

        $.post('https://5d76bf96515d1a0014085cf9.mockapi.io/order', dataObj, function() {
            alert('Order Placed Successfully')
            var productList=JSON.parse(localStorage.getItem("productlist"));
            productList.splice(0,productList.length);
            localStorage.setItem("productlist",JSON.stringify(productList));
            location.assign('./Confirmation.html');

        })
        
    })
})