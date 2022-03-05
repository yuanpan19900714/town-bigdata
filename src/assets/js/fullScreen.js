//全屏展示
export const fullScreen = (el) => {
    var rfs = el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;
    var wscript;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    }
    // if (typeof window.ActiveXObject != "undefined") {
    //     wscript = new ActiveXObject("WScript.Shell");
    //     if (wscript) {
    //         wscript.SendKeys("{F11}");
    //     }
    // }
}

//退出全屏
export const exitFullScreen = (el) => {
    var rfs = el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen;
    var wscript;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    }
    // if (typeof window.ActiveXObject != "undefined") {
    //     wscript = new ActiveXObject("WScript.Shell");
    //     if (wscript) {
    //         wscript.SendKeys("{F11}");
    //     }
    // }
}