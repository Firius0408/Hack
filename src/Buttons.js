function download(markdown) {
    const element = document.createElement("a");
    const file = new Blob([markdown], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "markdown.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}

function plain(markdown) {
    const file = new Blob([markdown], {type: 'text/plain'});
    var wnd = window.open("about:blank", "_blank");
    wnd.document.write(markdown);
}

function pdf(markdown) {

}

export { download, plain, pdf };