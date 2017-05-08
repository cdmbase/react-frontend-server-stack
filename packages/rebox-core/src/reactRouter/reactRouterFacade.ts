

const loadBranchData = (location) => {
    const branch = matchRoutes(routes, location.pathName);

    const promises = branch.map(({route, match }) => {
        return route.loadData 
            ? route.loadData(match)
            : Promise.resolve(null)
    });

    return Promise.all(promises);
}

// useful on the server for preloading data
loadBranchData(req.url).then(data => {
    console.log(data);
});

// also useful on the client for "pending navigation" where you
// load up all data before rendering the next page when
// the url changes

match({ history, routes, location, req.url }, (error, redirectLocation, renderProps ) => {
    if (error) {
        res.status(500).send(error.message);
    } else if (redirectLocation) {
        this._context.history.replace(redirectLocation);
    } else if (!renderProps) {
        //
    } else {
        // Dispatch the initial action of each container first
        const promises = renderProps.components
            .filter(component => component.getInitialProps)
            .map(component => component.getInitialProps(store.dispatch, renderProps.params));

            // Then render the routes
            Promise.all(promises)
            .then(() => {
                const content = renderToString(
                    <Proivder store={store}>
                    <RouterContext {...renderProps}/>
                    </Provider> ,
                )
            })
    }
})