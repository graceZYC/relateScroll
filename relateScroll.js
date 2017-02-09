function relateScroll(id1, id2, className) {
    var myscrollL,
        myscrollR,
        heightArr = [],
        maxIndex = 0,
        timer = null;
    $(id2).children().children().each(function (i) {
        heightArr.push($(id2).children().children()[i].offsetTop);

    });
    function loaded() {
        setTimeout(function () {
            myscrollR = new iScroll(id2.replace('#',''), {
                useTransform: false,//关闭css变形,以便获取top值
                vScrollbar: false,//隐藏滚动条
                onScrollMove: function () {
                    listeningSlide();
                },
                onScrollEnd: function () {
                    clearInterval(timer);
                },
                onBeforeScrollEnd: function () {
                    timer = setInterval(listeningSlide, 1);
                }
            });
        }, 100);
        setTimeout(function () {
            myscrollL = new iScroll(id1.replace('#',''));
        }, 100);
    }

    window.addEventListener("load", loaded, false);
    function listeningSlide() {
        $(heightArr).each(function (i, v) {
            var wy = Math.abs($(id2).children().position().top);//实时获取位移值，取绝对值
            if (wy >= v) {//思想是，位移值大于某个滑块offsetTop的时候，记录下当前滑块的索引值
                maxIndex = i;
            }
        });
        $($(id1).children().children()[maxIndex])
            .addClass(className)
            .siblings()
            .removeClass(className);
    }
}
