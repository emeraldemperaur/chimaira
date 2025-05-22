import { useEffect, useState } from "react";
import TitleRibbon from "../artisan/pagetitle.ribbon";
import PropTypes from 'prop-types';
import Footer from "../artisan/footer";
import AIProfilePane from "../artisan/profile.pane";
import FloatingAction from "../artisan/floatingaction.button";
import AutoPrompter from "../artisan/auto.prompter";
import NeoToggle from "../artisan/neo.toggle";
import ChimeraConsole from "../artisan/terminal.console";
import ChimeraOutput from "../artisan/terminal.output";
import NeoTitle from "../artisan/neo.title";


const Dashboard = ({users}) => {
    document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
    const [isMultiline, setIsMultine] = useState(false);
    useEffect(()=> {
        document.body.style.background = 'radial-gradient(#ffffff, #dadada)';

    }, [users.data.firstName])

    const onAIActionClick = () => {
        console.log(`Dashboard AI Action button clicked`)
    }



    return(
        <>
        
        <TitleRibbon title='Dashboard' username={users.data.firstName}/>
        <NeoTitle title={<>&nbsp;Agentic Profiles</>} width="fit-content" height="69px" marginTop="23px !important" marginBottom="23px !important"/>
        <AIProfilePane/>
        <AutoPrompter profileIndex={4} responsesDictionary={{}}/>
        <NeoToggle setIsMultiline={setIsMultine}/> 
        <ChimeraConsole multiline={isMultiline}/>
        <ChimeraOutput/>
        <FloatingAction icon={<i className="fa-solid fa-microchip"></i>} onClickFunction={onAIActionClick}/>
        <Footer/>
      
        </>
    )
}

Dashboard.propTypes = {
  users: PropTypes.object.isRequired
}

export default Dashboard;