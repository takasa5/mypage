$(function(){
    buttonFlag = false;
});

function onHole(elm) {
    var page = $(elm).parents("article");
    openArticle(page, elm.id);
}

function openArticle(page, content) {
    var width = $(page).width() - 15;
    console.log(page, content);
    $(page).prev().find("#" + content).show();
    if ($(page).prev().find("#" + content).length == 0) {
        $(page).prev().find(".uc").show();
    }
    if (page[0].id == "article-2") {
        $("#article-3").animate({
            left: "-=20px"
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

    $("#leftSide").css("cursor", "pointer");
    $("#leftSide").on("click", function() {
        if (buttonFlag)
            return false;
        $("#leftSide").off("click");
        buttonFlag = true;
        if (page[0].id == "article-3") {
            $(this).css("cursor", "default");
        } else {
            if (page[0].id == "article-2")
                $(page).next().animate({
                    left: "+=20px"
                });
            $(this).one("click", function() {
                $(this).css("cursor", "default");
                $(page).find(".back").css("z-index", "auto");
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
                buttonFlag = false;
            }
        });
    });
}

function onBack(elm) {
    if (buttonFlag)
        return false;
    buttonFlag = true;
    var page = $(elm).parents("article");
    var width = $(page).next().width() - 15;

    $(page).children().find(".back").css("z-index", "auto");
    $(page).next().animate({
        left: "+=" + width + "px"
    }, {
        complete: function() {
            $(page).children().hide();
            buttonFlag = false;
        }
    });
    $("#leftSide").off("click");
    if (page[0].id == "article-2")
        $("#leftSide").css("cursor", "default");
    else if (page[0].id == "article-1") {
        $("#article-3").animate({
            left: "+=20px"
        });
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