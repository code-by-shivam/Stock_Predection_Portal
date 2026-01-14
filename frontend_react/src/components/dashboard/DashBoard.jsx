import { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faSearch, faChartLine, faChartArea, faMicrochip } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
    const [ticker, setTicker] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [plot, setPlot] = useState()
    const [ma100, setMA100] = useState()
    const [ma200, setMA200] = useState()
    const [prediction, setPrediction] = useState()

    const [mse, setMSE] = useState()
    const [rmse, setRMSE] = useState()
    const [r2, setR2] = useState()

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('/protected/');
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchProtectedData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axiosInstance.post('/predicted/', {
                ticker: ticker
            });
            console.log(response.data);
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT
            const plotUrl = `${backendRoot}${response.data.plot_img}`
            const ma100Url = `${backendRoot}${response.data.plot_100_dma}`
            const ma200Url = `${backendRoot}${response.data.plot_200_dma}`
            const predictionUrl = `${backendRoot}${response.data.plot_final_prediction}`

            setPlot(plotUrl)
            setMA100(ma100Url)
            setMA200(ma200Url)
            setPrediction(predictionUrl)
            setMSE(response.data.mse)
            setRMSE(response.data.rmse)
            setR2(response.data.r2)
            if (response.data.error) {
                setError(response.data.error)
            }
        } catch (error) {
            console.error('There was an error making the API request', error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-md-11 bg-light-dark p-5 rounded mt-5 mb-5 shadow-lg">
                    <h2 className='text-light text-center mb-4'>
                        <FontAwesomeIcon icon={faChartLine} className="text-info me-2" />
                        Stock Analysis Dashboard
                    </h2>


                    <div className="col-md-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input type="text" className='form-control ' placeholder='Enter Stock Ticker (e.g. AAPL, TSLA)'
                                    onChange={(e) => setTicker(e.target.value)} required
                                />
                            </div>
                            <small>{error && <div className='text-danger mt-2'>{error}</div>}</small>
                            <button type='submit' className='btn btn-info w-100 mt-3 py-2 fw-bold'>
                                {loading ? <span><FontAwesomeIcon icon={faSpinner} spin /> Analyzing Data...</span> : 'Generate Prediction'}
                            </button>
                        </form>
                    </div>

                    {/* Print prediction plots */}
                    {prediction && (
                        <div className="prediction mt-5">
                            <hr className="border-secondary mb-5" />

                            <h3 className="text-info text-center mb-4">
                                <FontAwesomeIcon icon={faChartArea} className="me-2" /> Visual Analysis
                            </h3>

                            <div className="row">
                                <div className="col-md-12 p-3 graph-container text-center">
                                    <h5 className="text-light mb-3">Original Close Price</h5>
                                    {plot && <img src={plot} style={{ maxWidth: '100%' }} alt="Plot" />}
                                </div>

                                <div className="col-md-12 p-3 graph-container text-center">
                                    <h5 className="text-light mb-3">100 Days Moving Average</h5>
                                    {ma100 && <img src={ma100} style={{ maxWidth: '100%' }} alt="MA100" />}
                                </div>

                                <div className="col-md-12 p-3 graph-container text-center">
                                    <h5 className="text-light mb-3">200 Days Moving Average</h5>
                                    {ma200 && <img src={ma200} style={{ maxWidth: '100%' }} alt="MA200" />}
                                </div>

                                <div className="col-md-12 p-3 graph-container text-center">
                                    <h5 className="text-light mb-3">Final Prediction</h5>
                                    {prediction && <img src={prediction} style={{ maxWidth: '100%' }} alt="Prediction" />}
                                </div>
                            </div>

                            <div className="text-light p-4 mt-4 bg-dark rounded border border-secondary">
                                <h4 className="border-bottom border-info pb-2 mb-3">
                                    <FontAwesomeIcon icon={faMicrochip} className="text-info me-2" />
                                    Model Evaluation Metrics
                                </h4>
                                <div className="row">
                                    <div className="col-md-4">
                                        <p className="mb-1 text-secondary small">Mean Squared Error</p>
                                        <h5 className="text-info">{mse}</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="mb-1 text-secondary small">Root Mean Squared Error</p>
                                        <h5 className="text-info">{rmse}</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="mb-1 text-secondary small">R-Squared Score</p>
                                        <h5 className="text-info">{r2}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
