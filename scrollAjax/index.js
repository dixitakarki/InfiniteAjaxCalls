var $scrollFlag = true,offset=5;
function populateData(response) {
  getCardsInfoTemplate(response);
  $(".loader").hide();
}
function getCardsInfoTemplate(cardInfo) {
  $("itz-continuous-stories").empty();
  var $cardsTemplateContainerRow = $(".card.card-detail");
  cardInfo.forEach(function(cardObj, i) {
    if (cardObj.embedUrl) {
      var $cardsEmbedTemplateRow = $(".card-embed__template").html(),
        carEmbedRowTemp = "";

      carEmbedRowTemp = $cardsEmbedTemplateRow.replace(
        /\{\{EMBEDCODE\}\}/g,
        cardObj.description || ""
      );

      $cardsTemplateContainerRow.append(carEmbedRowTemp);
    } else {
      var $cardsTemplateRow = $(".card-detail__template").html(),
        carResultRowTemp = "";
      carResultRowTemp = $(
        $cardsTemplateRow
          .replace(/\{\{CARDNAME\}\}/g, cardObj.name || "")
          .replace(/\{\{CARDDATE\}\}/g, cardObj.date || "")
          .replace(/\{\{CARDINFO\}\}/g, cardObj.description || "")
          .replace(/\{\{IMGSRC\}\}/g, cardObj.imagePath || "")
      );

      var tag = carResultRowTemp.find(`.tags`);
      for (var j = 0; j < cardObj.tags.length; j++) {
        var latest_btn = document.createElement("BUTTON");
        latest_btn.classList.add("btn", "tag-button");
        latest_btn.innerHTML = cardObj.tags[j];
        tag.append(latest_btn);
      }

      $cardsTemplateContainerRow.append(carResultRowTemp);
    }
  });
}
$(window).scroll(function() {
  if (
    $(window).scrollTop() >=
    $(document).height() - $(window).height() - 100
  ) {
    function stopAjaxCall(res){
      if(res.length==0){
        //alert('go to hell');
        //return;
      }
    }
   
      $.ajax({
        url: "https://api.myjson.com/bins/1bmhjy",
        dataType: "json",
           data: {
             offset:offset
          },
        type: "GET",
        beforeSend: function( xhr ) {
          $(".loader").show();
         if( $scrollFlag==false){
           return false;
         }
         if($scrollFlag==true){
           $scrollFlag=false;
         }
        },
        success: function(response) {
          stopAjaxCall(response);
          populateData(response);
        },
        error: function(errorThrown) {
          console.log(errorThrown.error);
        }
      }).done(()=>{
        if($scrollFlag==false){
          $scrollFlag=true;
          offset = offset+5;
        }
       
      });
  }
});
