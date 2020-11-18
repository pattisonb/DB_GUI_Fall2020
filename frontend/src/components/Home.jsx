import React, { useState, useEffect } from 'react';
import logo from '../img/PonyList.PNG';
import { Loader } from './layout/Loader';
import Navbar from './layout/Navbar';

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []); // here
  return <>{loading ? <Loader /> : <Navbar />}</>;
}
