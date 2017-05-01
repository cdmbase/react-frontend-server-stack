import { Store } from '@redux-bootstrap/core';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'react-fela';
import { connect } from 'react-redux';


const common = ({ themes }: { themes: any }) =>
  (WrappedComponent: React.SFC<any>) => {
    const Common = (
      {
        theme,
        themeName,
        intl: { defaultLocale, initialNow, currentLocale, messages },
        ...props
      }: any,
    ) => (
        <ThemeProvider
          key={themeName} // Enforce rerender.
          theme={theme}
        >
          <IntlProvider
            defaultLocale={defaultLocale}
         //   initialNow={initialNow}
            key={currentLocale} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
            locale={currentLocale}
            messages={messages[currentLocale]}
          >
            <WrappedComponent {...props} />
          </IntlProvider>
        </ThemeProvider>
      );
    return connect((state: Store.State) => ({
      intl: state.intl,
      theme: themes[state.app.currentTheme] || themes.defaultTheme,
      themeName: state.app.currentTheme
    }))(Common);
  };

export default common;