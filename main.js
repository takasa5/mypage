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
        console.log(this);
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
}
function draw() {
    if (checkInTriangle(winMouseX, winMouseY)) {
        if (screenStatus == "DEFAULT") {
            cursor(ARROW);
        } else {
            cursor(HAND);
        }
        $(".bg-font").fadeOut();
    } else {
        if (winMouseY > triangle.left.y && winMouseX > triangle.left.x && winMouseX < triangle.right.x) {
            if (screenStatus == "BOTTOM")
                cursor(ARROW);
            else {
                cursor(HAND);
                $("#profile-font").fadeIn();
            }
        } else if (winMouseX > triangle.top.x && winMouseY < triangle.right.y) {
            if (screenStatus == "RIGHT")
                cursor(ARROW);
            else
                cursor(HAND);
        } else if (winMouseX < triangle.top.x && winMouseY < triangle.left.y) {
            if (screenStatus == "LEFT")
                cursor(ARROW);
            else
                cursor(HAND);
        } else {
            cursor(ARROW);
            $(".bg-font").fadeOut();
        }
    }
}

function windowResized() {
    cnv.style("width", windowWidth + "px");
    cnv.style("height", windowHeight + "px");
    triangle.refresh();
}

function clickAction() {
    console.log(winMouseX, winMouseY);
    if (checkInTriangle(winMouseX, winMouseY)) {
        console.log("in");
        if (screenStatus != "DEFAULT") {
            $("#triangle").animate({
                "top": "50%",
                "left": "50%",
                "opacity": "1"
            }, 400, function() {
                triangle.refresh();
            });
            screenStatus = "DEFAULT";
            $(".modal").fadeOut();
        }
    }else{
        if (winMouseY > triangle.left.y && winMouseX > triangle.left.x && winMouseX < triangle.right.x) {
            console.log("bottom");
            $("#triangle").animate({
                "top": "-20%",
                "opacity": "0.3"
            }, 400, function() {
                triangle.refresh();
            });
            $("#profile-modal").fadeIn();
            screenStatus = "BOTTOM";
        } else if (winMouseX > triangle.top.x && winMouseY < triangle.right.y) {
            console.log("right");
            $("#triangle").animate({
                "top": "80%",
                "left": "0%",
                "opacity": "0.3"
            }, 400, function() {
                triangle.refresh();
            });
            screenStatus = "RIGHT";
        } else if (winMouseX < triangle.top.x && winMouseY < triangle.left.y) {
            console.log("left");
            $("#triangle").animate({
                "top": "80%",
                "left": "100%",
                "opacity": "0.3"
            }, 400, function() {
                triangle.refresh();
            });
            screenStatus = "LEFT";
        }
        $(".bg-font").fadeOut();
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
    screenStatus = "DEFAULT";
    $(".modal").fadeOut();
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

