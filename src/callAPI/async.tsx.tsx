import React from 'react'

interface IState {
  isLoading: boolean;
  error?: Error;
}

interface IErrorProps {
  error: Error;
}

interface ErrorOverideInterface {
  renderError?: React.Component<IErrorProps, {}, any> | undefined
  error: Error;
}

interface LoadingOverrideInterface {
  renderLoading?: React.Component<any>;
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

function ErrorOverride({renderError}: ErrorOverideInterface) {
  return <>{renderError ?
    renderError
  :
  DefaultErrorComponent
  }</>
}

function LoadingOverride({renderLoading}: LoadingOverrideInterface) {
  return <>{renderLoading ? renderLoading : DefaultLoadingComponent}</>;
}

export default ({ state, renderError: ErrorComponent, renderLoading: LoadingComponent, children }: IAsyncProps) => {

  
  if (state.error) {
    return <ErrorOverride error={state.error} renderError={ErrorComponent} />
  } else if (state.isLoading) {
    return <LoadingOverride renderLoading={LoadingComponent} />
  } else {
    return children
  }
}