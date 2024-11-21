import React, { useState } from 'react';
import styles from "./HospitalFilter.module.css";
import { useAppSelector } from '../../app/hooks';
const HospitalFilter = (props) => {
    const user = useAppSelector((state) => state.user);

    const [specialityFilter, setSpecialityFilter] = useState('all');
    const [radiusFilter, setRadiusFilter] = useState(5);

    const handleSpecialityChange = (event) => {
        setSpecialityFilter(event.target.value);
    };

    const handleRadiusChange = (event) => {
        setRadiusFilter(event.target.value);
    };

    const submitClickHandler = () => {
        props.filter(specialityFilter, radiusFilter);
    }


    return (
        <div className={styles.main}>
            <div className={styles.sub}>
                <label>
                    Filter by Speciality:
                    <select value={specialityFilter} onChange={handleSpecialityChange} className={styles.input}>
                        <option value={'all'}>All</option>
                        <option value={'MultiSpeciality'}>MultiSpeciality</option>
                        <option>Dermatology</option>
                        <option>GeneralSurgery</option>
                        <option>Gastroenterology</option>
                        <option>Oncology</option>
                        <option>Orthopaedics</option>
                        <option>ENT</option>
                        <option>ophthalmology</option>
                    </select>
                </label>
                <label>
                    Radius (in km):
                    <input className={styles.input} type="number" value={radiusFilter} onChange={handleRadiusChange} />
                </label>

                <button onClick={submitClickHandler} className={styles.btn}>Apply Filters</button>
            </div>
        </div>
    );
};

export default HospitalFilter;
