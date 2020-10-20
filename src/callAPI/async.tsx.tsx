import React from 'react'

interface IState {
  isLoading: boolean;
  error?: Error;
}

interface IErrorProps {
  error: Error;
}
  
interface IAsyncProps {
  state: IState;
  renderError?: React.Component<IErrorProps>;
  renderLoading?: React.Component<any>;
  children: React.Component<any>;
}
  
const DefaultErrorComponent = ({ error }: IErrorProps) => {
  return <p>ERROR! {error.toString()}</p>
}

const DefaultLoadingComponent = () => {
  return <p>Loading...</p>
}

export default ({ state, renderError: ErrorComponent, renderLoading: LoadingComponent, children }: IAsyncProps) => {
  const ErrorOverride = ErrorComponent || DefaultErrorComponent;
  const LoadingOverride = LoadingComponent || DefaultLoadingComponent;
  
  if (state.error) {
    return <ErrorOverride error={state.error} />
  } else if (state.isLoading) {
    return <LoadingOverride />
  } else {
    return children
  }
}