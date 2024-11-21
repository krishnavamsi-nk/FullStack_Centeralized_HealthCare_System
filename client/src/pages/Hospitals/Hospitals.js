import React, { useEffect, useState } from 'react'
import HospitalFilter from '../../components/HospitalFilter/HospitalFilter';
import Header from '../../components/Header/Header';
import styles from "./Hospitals.module.css";
import { useAppSelector } from '../../app/hooks';
import HospitalCard from '../../components/HospitalCard/HospitalCard';
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton';
import FetchLoader from '../../components/Loaders/fetchLoader';
import NoData from "../../components/NoData/NoData";
const Hospitals = () => {
    const user = useAppSelector((state) => state.user);
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchData = async (specialityFilter, radiusFilter) => {
        try {
            setLoading(true);
            const filterData = { speciality: specialityFilter, distance: radiusFilter, latitude: user.latitude, longitude: user.longitude }
            const response = await fetch(`${process.env.REACT_APP_API_URL}/patients/hospitals/${radiusFilter}/${user.longitude}/${user.latitude}/${specialityFilter}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setLoading(false)
            const data = await response.json();
            setHospitals(data);
        } catch (error) {
            setLoading(false)
            console.error('Error fetching data:', error);
        }
    };
    const applyFilters = (specialityFilter, radiusFilter) => {
        console.log(specialityFilter, radiusFilter)
        fetchData(specialityFilter, radiusFilter);
    };
    useEffect(() => {
        fetchData('all', 5);
    }, [])
    return (<>
        <Header />
        <div className={styles.main}>
            <HospitalFilter filter={applyFilters} />
            {
                !loading &&
                <>
                    {

                        hospitals.length !== 0 &&

                        <div className={styles.hospitalsList}>
                            {hospitals.map((hospital) => (
                                <HospitalCard key={hospital._id} hospital={hospital} />
                            ))}
                            <BackToTopButton />
                        </div>

                    }

                    {
                        hospitals.length === 0 && <NoData />
                    }
                </>
            }
            {
                loading && <FetchLoader />
            }
        </div>
    </>
    )
}

export default Hospitals