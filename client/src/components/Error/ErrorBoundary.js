// import ErrorPage from "./ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import SomethingWentWrong from "./SomethingWentWrong";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContex from "../../store/Auth-ctx";

export default function ReactErrorBoundary(props) {
  const ctx = useContext(AuthContex)
    return (
        <ErrorBoundary
            FallbackComponent={SomethingWentWrong}
            onError={(error, errorInfo) => {
                // log the error
		console.log("Error caught!");  
		console.error(error);  
		console.error(errorInfo);
		
		// record the error in an APM tool...
            }}
            onReset={() => {
              ctx.PageNotFoundHandler
              // reloading the page to restore the initial state
              // of the current page
              console.log("reloading the page...");
              // other reset logic...
          }}
        >
            {props.children}
        </ErrorBoundary>
    );
}