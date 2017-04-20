import Btn from "./btn_component";
import * as React from "react";

interface CounterProps {
    count: string;
    addBtnTextLabel: string;
    incrementAsync: () => any;
    mutate?: ({})=>any;
    apolloQuery?: any;
}

class Counter extends React.Component<CounterProps, any> {
    public render() {

        const { mutate, apolloQuery } = this.props;

        const incrementAsync = ()=>{
            console.log("incrementAsync mutate")
            mutate({ 
                variables: { name: "no name" },
                refetchQueries: [ { query: apolloQuery }],
            })
        }


        return (
            <div>
                <div className="count">
                    <span>{this.props.count}</span>
                </div>
                <Btn clickHandler={incrementAsync} textLabel={this.props.addBtnTextLabel} />
            </div>
        );
    }
}

export default Counter;
