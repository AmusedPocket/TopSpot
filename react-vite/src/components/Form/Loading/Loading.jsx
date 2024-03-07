import './Loading.css'

const Loading = () => {
    return(
        <div className="loading-page">
            <p className="loading-page-text">Please wait, loading...</p>
            <img src="https://topspots.s3.us-west-1.amazonaws.com/logo.png" className="loading-logo" />
        </div>
    )
}

export default Loading;