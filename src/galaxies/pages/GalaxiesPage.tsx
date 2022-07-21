import React from 'react';
import Mars from '../../components/Mars/Mars';
import { Route, Routes } from 'react-router-dom';
import Earth from '../../components/Earth/Earth';
import NavBar from '../../components/NavBar/NavBar';
import Exoplanets from '../../components/Asteroids/Asteroids';
import PictureOfTheDay from '../../components/PictureOfTheDay/PictureOfTheDay';

const GalaxiesPage = () => {
    return (
        <div>
            <NavBar />
            <div>
                <Routes>
                    <Route path='/dashboard' element={<PictureOfTheDay />} />
                    <Route path='/mars' element={<Mars />} />
                    <Route path='/earth' element={<Earth />} />
                    <Route path='/' element={<PictureOfTheDay />} />
                </Routes>
            </div>
        </div>
    )
}

export default GalaxiesPage;