$(function(){
});

function onHole(elm) {
    var page = $(elm).parents("article");
    openArticle(page, elm.id);
}

function openArticle(page, content) {
    var width = $(page).width() - 15;
    $(page).prev().find("#" + content).show();
    console.log($(page).prev().find("#" + content).length);
    if ($(page).prev().find("#" + content).length == 0) {
        $(page).prev().find(".uc").show();
    }
    console.log(page[0].id);
    if (page[0].id == "article-2") {
        $("#article-3").animate({
            left: "-=15px"
        });
        $("#leftSide").off("click");
    }
    $(page).animate({
        left: "-=" + width + "px"
    },
    {
        complete: function() {
            $(page).prev().find(".back").css("z-index", "1");
        }
    });
    // 左判定
    $("#leftSide").css("cursor", "pointer");
    $("#leftSide").one("click", function() {
        if (page[0].id == "article-3") {
            $(this).css("cursor", "default");
        }else if (page[0].id != "article-3") {
            $(page).next().animate({
                left: "+=15px"
            });
            $(this).one("click", function() {
                $(this).css("cursor", "default");
                var wid = $(page).next().width() - 15;
                $(page).next().animate({
                    left: "+=" + wid + "px"
                },{
                    complete: function() {
                        $(page).children().hide();
                    }
                });
            });
        }
        $(page).prev().find(".back").css("z-index", "auto");
        $(page).animate({
            left: "+=" + width + "px"
        },{
            complete: function() {
                // $(page).prev().find("#" + content).hide();
                $(page).prev().children().hide();
            }
        });
    });
}

function onBack(elm) {
    var page = $(elm).parents("article");
    var width = $(page).next().width() - 15;

    $(page).children().find(".back").css("z-index", "auto");
    $(page).next().animate({
        left: "+=" + width + "px"
    }, {
        complete: function() {
            $(page).children().hide();
        }
    });
    if (page[0].id == "article-1") {
        $("#article-3").animate({
            left: "+=15px"
        });
        $("#leftSide").off("click");
        $("#leftSide").one("click", function() {
            $("#article-2").find(".back").css("z-index", "auto");
            var wid = $("#article-3").width() - 15;
            $("#article-3").animate({
                left: "+=" + wid + "px"
            },{
                complete: function() {
                    $("#article-2").children().hide();
                }
            });
        });
    }


}