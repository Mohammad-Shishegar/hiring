import React from "react";
import { useErrorContext } from "../../helpers/contexts/BoundaryContext";

type Props = {
  children: React.ReactNode;
  setError: (error: Error) => void;
  resetError: () => void;
};

type State = {
  hasError: boolean;
};

class ErrorBoundaryInner extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.setError(error);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    this.props.resetError();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, textAlign: "center" }}>
          <h2>یه خطایی رخ داده!</h2>
          <button onClick={this.handleReset}>تلاش دوباره</button>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const { setError, resetError } = useErrorContext();

  return (
    <ErrorBoundaryInner setError={setError} resetError={resetError}>
      {children}
    </ErrorBoundaryInner>
  );
};

export default ErrorBoundary;
