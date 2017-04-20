import * as React from "react";
import { withUser } from '@accounts/react';

class HomePage extends React.Component<any, void> {
    public render() {
        return (
            <h1>Home Page!</h1>
        );
    }
}

// export default HomePage;
export default withUser(({ user }) => <HomePage />);
