import jsPDF from 'jspdf';

function download(markdown) {
    const element = document.createElement("a");
    const file = new Blob([markdown], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "markdown.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}

function plain(markdown) {
    var wnd = window.open("about:blank", "_blank");
    wnd.document.write(markdown);
    wnd.document.title = "Plain Markdown";
}

function pdf(html) {
    let doc = new jsPDF('p', 'pt', 'letter');
    doc.fromHTML(
        html.__html,
        25,
        20, 
        { 'width': 550 }
        );
    doc.output('dataurlnewwindow');
}

function upload(markdown) {

}

export { download, plain, pdf, upload };