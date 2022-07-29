import PropTypes from 'prop-types';
import css from '../Button/Button.module.css';

const Button = ({ onClick }) => {
    return (
        <button className={css.button} type='button' onClick={onClick}>Load more</button>
    )
}

export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}