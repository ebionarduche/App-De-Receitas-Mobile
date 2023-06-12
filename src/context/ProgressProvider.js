import PropTypes from 'prop-types';
import ProgressContext from './ProgressContext';

export default function ProgressProvider({ children }) {
  return (
    <ProgressContext.Provider>
      <div>
        { children }
      </div>
    </ProgressContext.Provider>
  );
}

ProgressProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
