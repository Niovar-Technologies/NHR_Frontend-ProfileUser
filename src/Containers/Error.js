import React from "react";
import error from '../static/img/error page.jpg'

class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div style={{width: "100%", height: "100%"}} onClick={() => {
                window.location.href = '/'
            }}>
                <img src={error} style={{width: "100%", height: "100%"}}/>
            </div>;
        }
        return this.props.children;
    }
}