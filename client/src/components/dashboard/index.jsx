import { useEffect } from "react";
import TitleRibbon from "../artisan/pagetitle_ribbon";

const Dashboard = ({users}) => {
    useEffect(()=> {

    }, [users.data.firstName])
    return(
        <>
        <TitleRibbon title='Dashboard' username={users.data.firstName}/>
        </>
    )
}

export default Dashboard;