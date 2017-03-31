import Btn from "./btn_component";
import * as React from "react";

interface CounterProps {
    count: string;
    addBtnTextLabel: string;
    incrementAsync: () => any;
}

class Counter extends React.Component<CounterProps, any> {
    public render() {
        return (
            <div>
                <div className="count">
                    <span>{this.props.count}</span>
                </div>
                <Btn clickHandler={this.props.incrementAsync} textLabel={this.props.addBtnTextLabel} />
            </div>
        );
    }
}

export default Counter;
