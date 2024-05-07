import React, { useState } from "react";
import FaqDashboardSideBar from "../../components/Dasun/FaqDashBoardSideBar";
import '../../css/Dasun/faqDashboard.css';
import AllFaqs from "../../components/Dasun/allFaq";
import AddFaq from "../../components/Dasun/addFaq";
import ViewBlog from "../../components/Dasun/allBlog";
import Feedbacks from "../../components/Dasun/AllFeedbacks";
import AddBlog from "../../components/Dasun/addBlog";
import Messages from "../../components/Dasun/Messages";

export default function FaqDashboard(){

    const [selectedOption, setSelectedOption] = useState('home');

    return(
        <div className="dashboardContainer">
            <div className="sideBar">
                <FaqDashboardSideBar onSelectOption={setSelectedOption}/>
            </div>
            <div className="dashboardContent">
                <div className="all_faqs">
                    {selectedOption === "all_faqs" && <AllFaqs />}
                </div>
                <div className="add_faqs">
                    {selectedOption === "add_faqs" && <AddFaq/>}
                </div>
                <div className="all_blogs">
                    {selectedOption === "all_blogs" && <ViewBlog/>}
                </div>
                <div className="add_blog">
                    {selectedOption === "add_blog" && <AddBlog/>}
                </div>
                <div className="all_feedbacks">
                    {selectedOption === "all_feedbacks" && <Feedbacks/>}  
                </div>
                <div className="all_messages">
                    {selectedOption === "all_messages" && <Messages/>}  
                </div>
            </div>
        </div>
    )
}