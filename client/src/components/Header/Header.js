import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { useAppDispatch } from "../../app/hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useAppSelector } from "../../app/hooks";
import { userActions } from "../../features/userSlice";
import { toast } from "react-toastify";
import HeaderLogo from "./HeaderLogo.svg";
import styles from "./Header.module.css";
const Header = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const response = await axiosInstance.get(`${user.type}/logout`);
            dispatch(userActions.reset());
            toast.success("Logged out successfully!", {
                position: "top-right",
                toastId: 7,
            });
            navigate("/", { replace: true });
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message, {
                position: "top-right",
            });
        }
    };
    const navbarStyles = `${styles.header} "bg-body-tertiary"`;
    return (
        <>
            {["lg"].map((expand) => (
                <Navbar key={expand} expand={expand} className={navbarStyles}>
                    <Container fluid className={styles.container}>
                        <Navbar.Brand to="/" as={Link} className={styles.brand}>
                            <img alt="logo" src={HeaderLogo} />
                            <span className={styles.navHeading}>CHS</span>
                        </Navbar.Brand>
                        <Navbar.Toggle className={styles.toggler} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title
                                    id={`offcanvasNavbarLabel-expand-${expand}`}
                                >
                                    CHS
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-5 header__offcanvas">
                                    <Nav.Link as={Link} to="/" style={{ textAlign: "center" }}>
                                        Home
                                    </Nav.Link>
                                    {user.isLoggedIn && (
                                        <Nav.Item style={{ height: "100%", position: "relative" }}>
                                            <Dropdown style={{ height: "100%", textAlign: "center" }} bsPrefix={styles.buttonContainer} drop="start">
                                                <Dropdown.Toggle id="dropdown-basic" bsPrefix={styles.DropdownButton}>
                                                    {!user.image && <FontAwesomeIcon icon={faCircleUser} size="2xl" style={{ color: "#114639", }} />}
                                                    {user.image && <img src={`${process.env.REACT_APP_API_URL}/${user.image}`} alt="profile" className={styles.profileImage} height={36} width={36} />}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu align={"start"} style={{ textAlign: "center" }}>
                                                    <Dropdown.Item to={"/dashboard"} as={NavLink} >Dashboard</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item onClick={logout} >Logout</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Nav.Item>
                                    )}
                                    {
                                        !user.isLoggedIn && (
                                            <Nav.Item style={{ height: "100%", position: "relative" }}>
                                                <Dropdown style={{ height: "100%", textAlign: "center" }} bsPrefix={styles.buttonContainer} drop="start" >
                                                    <Dropdown.Toggle id="dropdown-basic" bsPrefix={styles.DropdownButton}>
                                                        Partners
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu align={"start"} style={{ textAlign: "center" }}>
                                                        <Dropdown.Item to={"/auth/doctorslogin"} as={NavLink} >Doctors</Dropdown.Item>
                                                        <Dropdown.Item to={"/auth/hospitalslogin"} as={NavLink} >Hospitals</Dropdown.Item>
                                                        <Dropdown.Item to={"/auth/adminlogin"} as={NavLink} >Admin</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Nav.Item>
                                        )
                                    }
                                </Nav>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
};

export default Header;