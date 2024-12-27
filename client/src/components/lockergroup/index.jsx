import { useEffect } from "react";
import FloatingAction from "../artisan/floating_action_button";
import TitleRibbon from "../artisan/pagetitle_ribbon";

const LockerGroup = ({users}) => {
    useEffect(()=> {

    }, [])
    const onActionClick = () =>{
        console.log('On Action clicked -- Locker Group')
    }
    return(
        <>
        <TitleRibbon title='Locker Group'/>
        <FloatingAction icon={<i className="fa-solid fa-plus"></i>} onClickFunction={onActionClick}/>
        </>
    )
}

export default LockerGroup;