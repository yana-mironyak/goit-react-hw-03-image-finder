import PropTypes from 'prop-types';
import { Formik, Form, Field } from "formik";
import { FcSearch } from 'react-icons/fc';
import css from '../Searchbar/Searchbar.module.css';

const Searchbar = ({onSubmit}) => {
    return (
        <header className={css.searchbar}>
            <Formik initialValues={{searchImages: ''}} onSubmit={onSubmit}>
                <Form className={css.searchForm}>
                    <button type="submit" className={css.searchFormButton}>
                        <FcSearch size={24} />
                        <span className={css.searchFormButtonLabel}>Search</span>
                    </button>
                    <Field
                        className={css.searchFormInput}
                        type="text"
                        name='searchImages'
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </Form>
            </Formik>
        </header>
    )    
}

export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

