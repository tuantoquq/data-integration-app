import { Button } from '@material-ui/core';
import styles from './CSS/Header.module.css';
function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.headers}>
                <Button variant='contained' color='primary'>Địa điểm</Button>
                <Button variant='contained' color='default'>Khoảng cách</Button>
            </div>
        </div>
    );
}

export default Header;