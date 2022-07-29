import { BallTriangle } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css'

const Loader = () => {
    return <div className={css.loaderWrapp}>
        <BallTriangle color="#00BFFF" height={80} width={80} />
    </div>
}

export default Loader;