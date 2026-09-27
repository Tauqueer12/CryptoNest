import React, { useState, useEffect } from 'react'
import CoinItem from './CoinItem'
import CoinBuy from '../routes/Coin_buy'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Coins.css'
import profile1 from '../assets/profile-1.jpg'
import AChart from '../chart/chart'
import axios from 'axios'


const Coins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr'

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setCoins(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='container3'>
            <div className="nav-show">
                <Navbar />
            </div>
            <div>
                <div className='coin-search'>
                    <h1><i class="fa-solid fa-coins purple"></i> Top <span className='purple'>Coins</span></h1>
                </div>
                <div className='heading'>
                    <p>#</p>
                    <p className='coin-name'>Coin</p>
                    <p>Price</p>
                    <p>24h</p>
                    <p className='hide-mobile'>Volume</p>
                    <p className='hide-mobile'>Mkt Cap</p>
                </div>

                {loading ? (
                    <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-primary)" }}>
                        <h2>Loading Market Data...</h2>
                    </div>
                ) : (
                    coins.map(coins => {
                        return (
                            <Link to={`/coin/${coins.id}`} key={coins.id}>
                                <CoinItem coins={coins} />
                            </Link>

                        )
                    })
                )}

            </div>
            <div className="right">
                <div className="top" style={{ display: 'none' }}>
                    <button id="menu-btn">
                        <span className="material-icons-sharp">menu</span>
                    </button>
                </div>
                <div className="updates">
                    <AChart />
                </div>
            </div>
        </div>
    )
}

export default Coins