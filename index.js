$(document).ready(function(){
    console.log("script ready!");
    

    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product",function(response){
        console.log(response);
        for(var i=0;i<response.length;i++){
            if(response[i].isAccessory==false){
                var card=$("<div>").addClass("clothing-cards");
                var image=$("<a>").attr("href",`../product/details.html?p=${response[i].id}`);
                image.append($("<img>").attr("src",response[i].preview).attr("alt",response[i].name).addClass("card-image"));
                var metaWrapper=$("<div>").addClass("meta-wrapper");
                var productName=$("<h4>").text(response[i].name);
                var productBrand=$("<h5>").text(response[i].brand);
                var productPrice=$("<p>").text("Rs "+response[i].price);
                metaWrapper.append(productName,productBrand,productPrice);
                card.append(image,metaWrapper);
                $("#clothing-wrapper").append(card);
            }
            else{
                var card=$("<div>").addClass("clothing-cards");
                var image=$("<a>").attr("href",`../product/details.html?p=${response[i].id}`);
                image.append($("<img>").attr("src",response[i].preview).attr("alt",response[i].name).addClass("card-image"));
                var metaWrapper=$("<div>").addClass("meta-wrapper");
                var productName=$("<h4>").text(response[i].name);
                var productBrand=$("<h5>").text(response[i].brand);
                var productPrice=$("<p>").text("Rs "+response[i].price);
                metaWrapper.append(productName,productBrand,productPrice);
                card.append(image,metaWrapper);
                $("#accessory-wrapper").append(card);
            }
        }
    })

    var productList=JSON.parse(localStorage.getItem("productlist"));
    var cartCount=0;
    for(var i=0;i<productList.length;i++){
        cartCount+=productList[i].count;
    }
    $("#cart-count").text(cartCount);
              

})