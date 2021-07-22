function textareaAutoSize() {
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight > 30 ? tx[i].scrollHeight : '30') + "px;overflow-y:hidden;");
        tx[i].addEventListener("input", OnInput, false);
    }
    
    function OnInput() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    }
}

export default textareaAutoSize;