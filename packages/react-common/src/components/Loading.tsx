import { TextProps } from './Text';
import * as React from 'react';
import Text from './Text';
import { defineMessages, injectIntl, InjectedIntl, IntlShape, FormattedMessage } from 'react-intl';

const messages = defineMessages({
    loadingText: {
        defaultMessage: 'Loading',
        id: 'loading.loadingText',
    },
    longLoadingText: {
        defaultMessage: 'Still loading, please check your connection',
        id: 'loading.longLoadingText',
    },
});

type LoadingProps = TextProps & {
    intl: InjectedIntl,
};

type LoadingState = {
    currentText?: typeof messages.loadingText,
};

class Loading extends React.Component<LoadingProps, LoadingState> {
    state: LoadingState = {
        currentText: null,
    };

    private timer: any;
    private longTimer: any;
    props: LoadingProps;


    componentDidMount() {
        // www.nngroup.com/articles/response-times-3-important-limits
        this.timer = setTimeout(
            () => {
                this.setState({ currentText: messages.loadingText });
            },
            1000,
        );
        this.longTimer = setTimeout(
            () => {
                this.setState({ currentText: messages.longLoadingText });
            },
            10000,
        );
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        clearTimeout(this.longTimer);
    }



    render() {
        const { currentText } = this.state;
        if (!currentText) return null;
        const { intl, ...restProps } = this.props;

        return (
            <Text {...restProps } >
                {intl.formatMessage(currentText)}...
            </Text>
        );
    }
}

export default injectIntl(Loading);
