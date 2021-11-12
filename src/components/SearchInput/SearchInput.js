// STEP#6#1
// STEP#6#2 at this point we will download some packages for icons and styles.
// yarn add @material-ui/core @material-ui/icons
import SearchRounded from '@material-ui/icons/SearchRounded'
import styles from './SearchInput.module.css'

const SearchInput = ({ ...rest }) => {
    return <div className={styles.wrapper} >
        <SearchRounded />
        <input className={styles.input}
            {...rest} />
    </div>
}

export default SearchInput;