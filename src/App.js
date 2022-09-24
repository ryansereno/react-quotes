import React, { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Layout from "./components/layout/Layout";

const NewQuote = React.lazy(() => {
  return import("./pages/NewQuote");
});
const QuoteDetail = React.lazy(() => {
  return import("./pages/QuoteDetail");
});
const NotFound = React.lazy(() => {
  return import("./pages/NotFound");
});
const AllQuotes = React.lazy(() => {
  return import("./pages/AllQuotes");
});

function App() {
  return (
    <Layout>
      <Suspense fallback={<p>Loading..</p>}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>

          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>

          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
