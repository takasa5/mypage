class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.v = createVector(this.x, this.y);
    }
}

class Triangle {
    constructor() {
        this.refresh();
    }
    refresh() {
        this.top = new Coord($("#triangle > img").offset().left + $("#triangle > img").width() / 2,
            $("#triangle > img").offset().top);
        this.left = new Coord($("#triangle > img").offset().left,
            $("#triangle > img").offset().top + $("#triangle > img").height());
        this.right = new Coord($("#triangle > img").offset().left + $("#triangle > img").width(),
            $("#triangle > img").offset().top + $("#triangle > img").height());
        // console.log(this);
    }
}

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("bg");
    cnv.style("position", "absolute");
    cnv.style("padding", 0);
    cnv.style("margin", 0);
    cnv.mouseClicked(clickAction);
    triangle = new Triangle();
    screenStatus = "DEFAULT";
    $(".project-box").hover(mouseIn, mouseOut);
}

// project-boxへのhover処理
function mouseIn() {
    $(this).children(".project-textarea").fadeOut(100);
    $(this).children(".project-imgarea").delay(100).animate({"width": "100%"}, 100);
    $(this).children(".project-back").delay(100).fadeIn(200);
}
function mouseOut() {
    $(this).children(".project-imgarea").animate({"width": "30%"}, 200);
    $(this).children(".project-textarea").delay(200).fadeIn(100);
    $(this).children(".project-back").fadeOut(200);
}

function draw() {
    if (checkInTriangle(winMouseX, winMouseY)) {
        if (screenStatus == "DEFAULT") {
            cursor(ARROW);
        } else {
            cursor(HAND);
        }
        $(".bg-font").fadeOut(50);
    } else {
        if (winMouseY > triangle.left.y && winMouseX > triangle.left.x && winMouseX < triangle.right.x) {
            if (screenStatus == "BOTTOM")
                cursor(ARROW);
            else {
                cursor(HAND);
                onlyPopBGFont("#profile-font");
            }
        } else if (winMouseX > triangle.top.x && winMouseY < triangle.right.y) {
            if (screenStatus == "RIGHT" || screenStatus == "BOTTOM")
                cursor(ARROW);
            else {
                cursor(HAND);
                onlyPopBGFont("#project-font");
            }
        } else if (winMouseX < triangle.top.x && winMouseY < triangle.left.y) {
            if (screenStatus == "LEFT" || screenStatus == "BOTTOM")
                cursor(ARROW);
            else
                cursor(HAND);
        } else {
            cursor(ARROW);
            $(".bg-font").fadeOut(50);
        }
    }
}

function windowResized() {
    cnv.style("width", windowWidth + "px");
    cnv.style("height", windowHeight + "px");
    triangle.refresh();
}

function clickAction() {
    // console.log(winMouseX, winMouseY);
    if (checkInTriangle(winMouseX, winMouseY)) {
        // console.log("in");
        if (screenStatus != "DEFAULT") {
            $("#triangle").animate({
                "top": "50%",
                "left": "50%",
                "opacity": "1"
            }, 400, function() {
                triangle.refresh();
            });
            replaceModal(screenStatus);
            screenStatus = "DEFAULT";
        }
    }else{
        if (winMouseY > triangle.left.y && winMouseX > triangle.left.x && winMouseX < triangle.right.x) {
            // console.log("bottom");
            $("#triangle").animate({
                "top": "-20%",
                "opacity": "0.3"
            }, 400, function() {
                triangle.refresh();
            });
            $("#profile-modal").animate({
                "top": "0%",
                "opacity": "1",
            });
            screenStatus = "BOTTOM";
        } else if (winMouseX > triangle.top.x && winMouseY < triangle.right.y && screenStatus != "BOTTOM") {
            // console.log("right");
            $("#triangle").animate({
                "top": "80%",
                "left": "0%",
                "opacity": "0.3"
            }, 400, function() {
                triangle.refresh();
            });
            $("#project-modal").animate({
                "top": "0%",
                "left": "0%",
                "opacity": "1"
            });
            screenStatus = "RIGHT";
        } else if (winMouseX < triangle.top.x && winMouseY < triangle.left.y && screenStatus != "BOTTOM") {
            // console.log("left");
            $("#triangle").animate({
                "top": "80%",
                "left": "100%",
                "opacity": "0.3"
            }, 400, function() {
                triangle.refresh();
            });
            screenStatus = "LEFT";
        }
        $(".bg-font").fadeOut(50);
    }
}

var bgfonts = ["#profile-font", "#project-font"];
function onlyPopBGFont(id) {
    for(var i = 0; i < bgfonts.length; i++) {
        if (id == bgfonts[i])
            $(bgfonts[i]).fadeIn(50);
        else
            $(bgfonts[i]).fadeOut(50);
    }
}

function replaceModal(status) {
    switch (status) {
        case "BOTTOM":
            $("#profile-modal").animate({
                "top": "150%",
                "opacity": "0",
            });
            break;
        case "RIGHT":
            $("#project-modal").animate({
                "top": "-100%",
                "left": "150%",
                "opacity": "0"
            });
            break;
    }
}

function onClose() {
    $("#triangle").animate({
        "top": "50%",
        "left": "50%",
        "opacity": "1"
    }, 400, function() {
        triangle.refresh();
    });
    replaceModal(screenStatus);
    screenStatus = "DEFAULT";
}

function onClickProject(box) {
    offset = $(box).offset();
    // project-boxの移動
    $(box).clone(true).attr("id", "boxtmp").appendTo($(box).parent().parent());
    // リンクの削除
    $("#boxtmp").wrapInner($("<div class='project-box' id='boxclone'></div>"));
    $("#boxclone").unwrap();
    // ホバー解除
    $("#boxclone").unbind("mouseenter").unbind("mouseleave");
    // アニメーション
    $("#boxclone").css({
        "position": "absolute",
        "-ms-transform": "translate(-50%,-50%)",
        "-webkit-transform": "translate(-50%,-50%)",
        "transform": "translate(-50%,-50%)",
    });
    $("#boxclone").css(offset);
    $("#boxclone").animate({
        "top": "50%",
        "left": "50%",
        "width": "90vw",
        "height": "90vh",
        "margin": "0"
    }, 400);
}

function checkInTriangle(x, y) {
    var p = createVector(x, y);
    var top_left = p5.Vector.sub(triangle.left.v, triangle.top.v);
    var top_p = p5.Vector.sub(p, triangle.top.v);
    var left_right = p5.Vector.sub(triangle.right.v, triangle.left.v);
    var left_p = p5.Vector.sub(p, triangle.left.v);
    var right_top = p5.Vector.sub(triangle.top.v, triangle.right.v);
    var right_p = p5.Vector.sub(p, triangle.right.v);
    var z1 = top_left.x * top_p.y - top_left.y * top_p.x;
    var z2 = left_right.x * left_p.y - left_right.y * left_p.x;
    var z3 = right_top.x * right_p.y - right_top.y * right_p.x;
    if ((z1 > 0 && z2 > 0 && z3 > 0) || (z1 < 0 && z2 < 0 && z3 < 0)) {
        return true;
    } else {
        return false;
    }
}

