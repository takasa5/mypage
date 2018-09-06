$(function(){

});

function onHole(elm) {
    var page = $(elm).parents("article");
    openArticle(page, elm.id);
}

function openArticle(page, content) {
    width = $(page).width() - 15;
    $(page).animate({
        left: "-=" + width + "px"
    });
    $(page).prev().find("#" + content).show();
}