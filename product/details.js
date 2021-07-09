$(document).ready(function(){
    console.log("script ready");
    var productId=window.location.search.split("=")[1];
    var productImageDiv=$("<div>").attr("id","product-image-div");
    var imageWrapper=$("<img>").attr("id","product-details-image");
    productImageDiv.append(imageWrapper);
    $("#product-details").append(productImageDiv);
    var count=0;
    function productImageWrapper(image,pos){
        var previewImages=$("<img>").attr("src",image)
            if(pos==0){
                previewImages.addClass("active-image");
                imageWrapper.attr("src",image);
            }
            
            previewImages.click(function(){
                var removeClass=document.getElementsByClassName("active-image")
                removeClass[0].className=""
                previewImages.addClass("active-image");
                imageWrapper.attr("src",image);
                document.body.scrollTop=0;
                document.documentElement.scrollTop=0;
            })
        
        return previewImages;
    }
    
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+productId,function(response){
        
        var productDetailsDiv=$("<div>").attr("id","product-details-div");
        var productName=$("<h1>").attr("id","product-title").text(response.name);
        var productBrand=$("<h2>").attr("id","product-brand").text(response.brand);
        var productPriceLabel=$("<h4>").addClass("product-section-heading").text("Price:Rs  ");
        productPriceLabel.append($("<p>").attr("id","product-details-price").text(response.price));
        var productDescriptionLabel=$("<h4>").addClass("product-section-heading").text("Description");
        var productDescription=$("<p>").attr("id","product-description").text(response.description)
        var productPreview=$("<h4>").addClass("product-section-heading").text("Product Preview");
        var previewImageWrapper=$("<div>").attr("id","preview-wrapper");
        for(var i=0;i<response.photos.length;i++){
           previewImageWrapper.append(productImageWrapper(response.photos[i],i));
        }
        productDetailsDiv.append(productName,productBrand,productPriceLabel,productDescriptionLabel,productDescription,productPreview,previewImageWrapper);
        $("#product-details").append(productDetailsDiv);
        var addCard=$("<button>").attr("id","btn-add-to-cart").text("Add to Cart");
        productDetailsDiv.append(addCard);

        var cartCount=0;
        var productList=JSON.parse(localStorage.getItem("productlist"))===null?[]:JSON.parse(localStorage.getItem("productlist"));
        for(var i=0;i<productList.length;i++){
            cartCount+=productList[i].count;
        }
        $("#cart-count").text(cartCount);
        addCard.click(function(){
            $("#btn-add-to-cart").css({
                "transform": "scale(1.1, 1.1)"   
            })
            setTimeout(function() {
                $("#btn-add-to-cart").css({
                    "transform": "scale(1, 1)"   
                })
            }, 200)
                console.log("clicked");
                console.log( productList);
               
                var pos=-1;
                for(var i=0;i<productList.length;i++){
                    if(productList[i].id==response.id){
                        pos=i;  
                    }
                }
                if(pos>-1){
                    productList[pos].count+=1;
                    localStorage.setItem("productlist",JSON.stringify(productList));
                }else{
                    response.count=1;
                    productList.push(response);
                    localStorage.setItem("productlist",JSON.stringify(productList));
                }
                var cartCount=0;
                for(var i=0;i<productList.length;i++){
                    cartCount+=productList[i].count;
                }
                $("#cart-count").text(cartCount);
                
        })
    })
    
      
})