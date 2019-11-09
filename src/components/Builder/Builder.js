import React from 'react';
import PropTypes from 'prop-types';
import { BuilderContext } from './BuilderContext';

export const Builder = ({ children, interval, phases, wrap }) => {
  const [build, setBuild] = React.useState(true);
  const [phase, setPhase] = React.useState(1);
  const [animationDuration] = React.useState(interval * 0.75);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const nextBuild =
        wrap || (build && phase < phases) || (!build && phase === 1);
      let nextPhase = nextBuild ? phase + 1 : Math.max(1, phase - 1);
      if (nextPhase > phases) {
        nextPhase = 1;
      }
      setBuild(nextBuild);
      setPhase(nextPhase);
    }, interval);
    return () => clearInterval(timer);
  }, [build, interval, phase, phases, wrap]);

  return (
    <BuilderContext.Provider value={{ animationDuration, build, phase }}>
      {children}
    </BuilderContext.Provider>
  );
};

Builder.propTypes = {
  children: PropTypes.node.isRequired,
  phases: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,
  wrap: PropTypes.bool,
};

Builder.defaultProps = {
  wrap: false,
};
