import React from 'react';

class Editor extends React.Component {
    render() {
        return (
            <div class="editor">
                <nav>
                    <div class="header">Editor</div>
                </nav>
                <textarea
                    class="text"
                    id="markdown-content"
                    onChange={this.props.handleChange}
                    defaultValue={this.props.defaultValue}
                    notab="notab"
                />
            </div>
        );
    }
}

export default Editor;