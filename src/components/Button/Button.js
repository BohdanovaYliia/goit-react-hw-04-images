import { Btn } from "./Button.styled";
import PropTypes from "prop-types";

export const Button = ({ onLoadMore }) => {
    return (
        <Btn type="button" onClick={onLoadMore}>Load more</Btn>
    )
}

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
}
