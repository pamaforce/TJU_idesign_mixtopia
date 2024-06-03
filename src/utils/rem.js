function setRem() {
    // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    //得到html的Dom元素
    let htmlDom = document.getElementsByTagName('html')[0];
    if (htmlWidth >= 620) {
        //设置根元素字体大小
        htmlDom.style.fontSize = htmlWidth / 120 + 'px';
    } else {
        //设置根元素字体大小
        htmlDom.style.fontSize = htmlWidth / 25.875 + 'px';
    }

}
export function getRootFontSize() {
    // 获取HTML的DOM元素
    const htmlDom = document.getElementsByTagName('html')[0];
    // 获取根元素的字体大小，并解析为数字
    const fontSizeString = window.getComputedStyle(htmlDom).fontSize;
    // 将fontSizeString（如 "16px"）转换为纯数字
    return parseFloat(fontSizeString);
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}