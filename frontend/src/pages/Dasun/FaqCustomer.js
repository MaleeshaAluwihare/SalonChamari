import React, {useState, useEffect} from "react";
import '../../css/Dasun/allFaq.css';
import '../../css/Dasun/faqPage.css';
// import '../css/Dasun/customerFaq.css';
import { Link } from "react-router-dom";

export default function CustomerFaq() {

    const [faqs, setFaqs] = useState([]);

    useEffect(() => {

        const allFaqs = async () => {

            try{

                const response = await fetch('http://localhost:8070/Faqs/display');
                const data = await response.json();

                setFaqs(data);

            } catch(error) {

                console.error('Error with fetching faqs : ', error);

            }

        }
        allFaqs();

    }, [])

    // return(

    //     <div id="Faq_customer_page">

    //         <h1 id="Faq_customer_page_heading" >FAQ</h1>

    //         <table id="Faq_customer_page_table" className="FaqTable">
    //             <thead id="Faq_customer_page_table_heading" className="theader">
    //                 <tr id="Faq_customer_page_table_hr" >
    //                     <th>Question</th>
    //                     <th>Answer</th>
    //                 </tr>
    //             </thead>

    //             <tbody id="Faq_customer_page_table_body" className="tbody">
    //                 {faqs.map(faqs => (
    //                     <tr id="Faq_customer_page_table_br" key={faqs._faqId}>
    //                         <td>{faqs.question}</td>
    //                         <td>{faqs.answer}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>

    //     </div>

    // )


    const toggleAnswer = (index) => {

        const updatedFaqs = faqs.map((faqs, i) => {
            if(i === index) {
                return { ...faqs, isOpen: !faqs.isOpen};
            }
            return faqs;
        });

        setFaqs(updatedFaqs);

    };
    

    // return(

    //     <div className="wrapper">

    //         <h1>FAQ</h1>

    //         {faqs.map(faqs => (
    //             <div className="faq">

    //                     <button className={`accordion ${activeAccordion === 0 ? 'active' : '' }`} onClick={() => toggleAccordion(0)} key={faqs._faqId}>
    //                         {faqs.question}
    //                         <i className="fa-solid fa-chevron-down"></i>
    //                     </button>
    //                     <div className={`pannel ${activeAccordion === 0 ? 'active' : ''}`} key={faqs._faqId}>

    //                         <p> {faqs.answer} </p>

    //                     </div>
                    
    //             </div>
    //         ))}

    //     </div>

        

    // )

    return (
        <div className="faq-container" id="faq_page" >
          <h1 id="faq_page_heading" >FAQ</h1>
          <div id="faq_page_faq_list" className="faq-list">
            {faqs.map((faqs, index) => (
              <div id="faq_page_item" className="faq-item" key={faqs.faqId}>
                <button id="faq_page_question" className="accordion" onClick={() => toggleAnswer(index)}>
                  {faqs.question}
                  <i className={`fa-solid fa-chevron-${faqs.isOpen ? 'up' : 'down'}`} id="faq_page_answer_open" ></i>
                </button>
                {faqs.isOpen && <div className="panel" id="faq_page_answer_label" ><p id="faq_page_answer" >{faqs.answer}</p></div>}
              </div>
            ))}
          </div>
        </div>
      );

    

    

}
