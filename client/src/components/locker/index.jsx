import { useEffect } from "react";
import FloatingAction from "../artisan/floating_action_button";
import TitleRibbon from "../artisan/pagetitle_ribbon";

const Locker = ({users}) => {
    useEffect(()=> {

    }, [])
    const onActionClick = () =>{
        console.log('On Action clicked -- Locker')
    }
    return(
        <>
        <TitleRibbon title='Locker'/>
        <FloatingAction icon={<i className="fa-solid fa-plus"></i>} onClickFunction={onActionClick}/>
        </>
    )
}

export default Locker;