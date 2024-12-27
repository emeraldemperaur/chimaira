import '../artisan/artisan.css'

const FloatingAction = ({icon , onClickFunction}) => {

    return(
        <>
        <div className='fab-btn' onClick={onClickFunction}>{icon}</div>   
        </>
    )
}

export default FloatingAction;