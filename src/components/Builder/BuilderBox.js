import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { BuilderContext } from './BuilderContext';

const normalizeAnimation = animation => {
  const result = animation;
  // if (animation) {
  //   if (Array.isArray(animation)) {
  //     result = animation.map(a => ({ ...a, duration }));
  //   } else if (typeof animation === 'object') {
  //     result = { ...animation, duration };
  //   } else if (typeof animation === 'string') {
  //     result = { type: animation, duration };
  //   }
  // }
  return result;
};

const BuilderBox = ({
  phase: boxPhase,
  phases,
  inProps,
  outProps,
  ...boxProps
}) => (
  <BuilderContext.Consumer>
    {({ animationDuration, build, phase }) => {
      let buildProps = {};
      let show = false;
      (phases || [{ phase: boxPhase, props: inProps }]).forEach(phaseDef => {
        let startPhase;
        let endPhase;
        if (Array.isArray(phaseDef.phase)) {
          [startPhase, endPhase] = phaseDef.phase;
        } else {
          startPhase = phaseDef.phase;
          endPhase = startPhase;
        }
        if (phase >= startPhase) {
          show = true;
        }
        if (build && phase >= startPhase && phase <= endPhase) {
          show = true;
          buildProps = { ...buildProps, ...phaseDef.props };
        } else if (!build && phase === startPhase) {
          buildProps.animation = 'fadeOut';
        }
      });
      if (show) {
        buildProps.animation = normalizeAnimation(
          buildProps.animation,
          animationDuration,
        );
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Box {...boxProps} {...buildProps} />;
      }
      return null;
    }}
  </BuilderContext.Consumer>
);

BuilderBox.propTypes = {
  ...Box.propTypes,
  phase: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  phases: PropTypes.arrayOf(
    PropTypes.shape({
      phase: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
      ]),
      props: PropTypes.shape({}),
    }),
  ),
  inProps: PropTypes.shape({}),
  outProps: PropTypes.shape({}),
};

BuilderBox.defaultProps = {
  phase: undefined,
  phases: [],
  inProps: { animation: 'fadeIn' },
  outProps: { animation: 'fadeOut' },
};

export { BuilderBox };
