import Helmet from 'react-helmet';
import * as React from 'react';
import { injectIntl, InjectedIntl} from 'react-intl';

type TitleProps = {
    intl?: InjectedIntl,
    message: string | any,
    values?: any,
};

const Title = ({ intl, message, values }: TitleProps) => 
    typeof message === 'string'
    ? <Helmet title={message} />
    : <Helmet title={intl.formatMessage(message, values)} />;

export default injectIntl(Title);