import React from 'react';

class DownloadButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.updateMarkdown = this.updateMarkdown.bind(this);
        this.state = {markdown: props.markdown};
    }

    updateMarkdown(value){
        this.setState({markdown: value});
    }

    handleClick() {
        const markdown = this.state.markdown;
        const element = document.createElement("a");
        const file = new Blob([markdown], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "markdown.md";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    render() {
        return (
            <div className="DownloadButton">
                <button type="button" onClick={this.handleClick}>Download Markdown</button>
            </div>
        );
    }
}

export default DownloadButton;