import React, { useEffect, useState } from 'react';
import styles from './Doctors.module.css';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import DoctorsListCard from '../../components/DoctorListCard/DoctorsListCard';
import FetchLoader from '../../components/Loaders/fetchLoader';
import NoData from '../../components/NoData/NoData';
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton';
let doctorsData = [];
const Doctors = () => {
    const params = useParams();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = params;
    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/patients/doctorlist/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            doctorsData = data;
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(`Error fetching data. ${error.message || 'Please try again.'}`);
        } finally {
            setLoading(false);
        }
    };
    const filterData = (e) => {
        const Speciality = e.target.value;
        if (Speciality === 'all')
            return setDoctors(doctorsData);
        const filteredData = doctorsData.filter(doctor => doctor?.Speciality === Speciality);
        setDoctors(filteredData);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <BackToTopButton />
            <div className={styles.main}>
                <div className={styles.doctorFilter}>
                    <label>
                        Filter by Speciality:
                        <select onChange={filterData} className={styles.input}>
                            <option value={'all'}>All</option>
                            <option>Dermatologist</option>
                            <option>Gastroenterologist</option>
                            <option>Orthopedic</option>
                            <option>Orthopaedics</option>
                            <option>ENT</option>
                            <option>Ophthalmologist</option>
                            <option>Other</option>
                        </select>
                    </label>
                </div>
                <div className={styles.doctorsList}>
                    {doctors.length !== 0 &&
                        <>
                            {!loading && doctors.map((doctor) => (
                                <DoctorsListCard key={doctor._id} doctor={doctor} hospitalId={id} />
                            ))}
                        </>
                    }
                </div>
                {
                    doctors.length === 0 && !loading && <div className="noData"> <NoData /> </div>
                }
                {
                    loading && <FetchLoader />
                }
            </div>

        </>
    );
};

export default Doctors;
