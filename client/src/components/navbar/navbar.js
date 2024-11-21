
import styles from "./Navbar.module.css"

const Navbar = (props) => {
    return (
        <div className={styles["navbar"]}>
            <div className={styles["wrapper"]}>
                {props.title}
            </div>
        </div>
    );
};

export default Navbar;
