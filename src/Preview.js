import React from 'react';

class Preview extends React.Component {
    render() {
        return (
            <div class="preview">
                <nav>
                    <div class="header">Preview</div>
                </nav>
                <div
                    className="content text"
                    dangerouslySetInnerHTML={this.props.getRawMarkup()}
                />
            </div>
        );
    }
}

export default Preview;