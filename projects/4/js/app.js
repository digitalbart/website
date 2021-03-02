/* lightbox */
$('.gallery').lightGallery({
  thumbnail:true,
  subHtmlSelectorRelative: true
}); 

/* search filter using text in each list element */
function filter(element) {
    var value = $(element).val().toUpperCase();

    $(".gallery > li").each(function() {
        if ($(this).text().toUpperCase().search(value) > -1) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
}