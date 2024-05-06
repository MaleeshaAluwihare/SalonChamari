import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Styles from '../../css/Maleesha/Quotation.module.css';
import 'jspdf-autotable';
import SalonLogo from '../../images/Maleesha/Logo.png';
import Header from '../Maleesha/Header';


export default function QuotationPage() {

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [serviceItems, setServiceItems] = useState([]);
    const [selectedServiceItem, setSelectedServiceItem] = useState('');
    const [selectedServicePrice, setSelectedServicePrice] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [allDropdownsSelected, setAllDropdownsSelected] = useState(false); // State variable to track if all dropdowns are selected
    const [showAppointmentForm, setShowAppointmentForm] = useState(false); // State variable to toggle the visibility of the appointment form
    const [customerName, setCustomerName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [quotation,setQuotaionPDF] = useState("");
    const [appointmentDate, setAppoinmentDate] = useState("");
    const [appointmentTime, setAppoinmentTime] = useState("");


    useEffect(() => {
        const fetchServices = async () => {
            const response = await axios.get('/quotation/allServices');
            setServices(response.data);
        };
        fetchServices();
    }, []);

    useEffect(() => {
        // Check if all dropdowns are selected whenever their values change
        setAllDropdownsSelected(selectedService && selectedSubcategory && selectedServiceItem);
    }, [selectedService, selectedSubcategory, selectedServiceItem]);

    //fetch subcategories when service given
    const handleServiceChange = async (event) => {
        const serviceName = event.target.value;
        setSelectedService(serviceName);
        setSelectedSubcategory('');
        const response = await axios.get(`/quotation/subcategories/${serviceName}`);
        setSubcategories(response.data);
    };

    //fetch service items when subcategory name given
    const handleSubcategoryChange = async (event) => {
        const subCategoryName = event.target.value;
        setSelectedSubcategory(subCategoryName);
        const response = await axios.get(`/quotation/serviceitems/${subCategoryName}`);
        setServiceItems(response.data);
    };

    //Set selected item
    const handleServiceItemClick = (event) => {
        const selectedItem = event.target.value;
        const selectedItemInfo = serviceItems.find(item => item.itemName === selectedItem);
        setSelectedServiceItem(selectedItem);
        setSelectedServicePrice(selectedItemInfo ? selectedItemInfo.itemPrice : '');
    };

    const handleAddService = () => {
        if (!allDropdownsSelected) {
            Swal.fire({
                title: 'Incomplete Selection',
                text: 'Please select all fields before proceeding.',
                icon: 'warning',
                confirmButtonText: 'OK',
                timer: 5000
            });
            return;
        }

        const itemNo = selectedServices.length + 1; // Generate item number based on existing selected services
        const selectedServiceInfo = {
            itemNo: `0${itemNo}`.slice(-2), // Format item number as 01 02 ...
            itemName: selectedServiceItem,
            itemPrice: selectedServicePrice,
            quantity: 1
        };
        setSelectedServices(prevServices => [...prevServices, selectedServiceInfo]);
        setSelectedServiceItem('');
        setSelectedServicePrice('');
    };

    const handleRemoveService = (index) => {
        setSelectedServices(prevServices => {
            const updatedServices = [...prevServices];
            updatedServices.splice(index, 1); // Remove the service at the specified index
            // Update the item numbers of the remaining services
            return updatedServices.map((service, i) => {
                return {
                    ...service,
                    itemNo: `0${i + 1}`.slice(-2) // Format the item number
                };
            });
        });
    };

    const handleQuantityChange = (index, increment) => {
        setSelectedServices(prevServices => {
            return prevServices.map((service, serviceIndex) => {
                if (serviceIndex === index) {
                    return {
                        ...service,
                        quantity: Math.max(service.quantity + increment, 1)
                    };
                }
                return service;
            });
        });
    };

    const calculateTotalAmount = () => {
        let total = 0;
        selectedServices.forEach(service => {
            total += service.itemPrice * service.quantity;
        });
        return total;
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
    
        const logo = new Image();
        logo.onload = function() {
            doc.addImage(logo, 'PNG', 70, 5, 60, 40); 
    
            // Add a title to the PDF with underline
            doc.setFontSize(22);
            doc.setFont('times', 'bold');
            doc.text('Quotation', 105, 55, { align: 'center' }); 
            doc.setDrawColor(0, 0, 0); 
            doc.line(80, 57, 130, 57);
            doc.line(80, 58, 130, 58); 
    
            // Salon address on the left side above the table
            doc.setFontSize(12);
            doc.setFont('times', 'normal');
            doc.setTextColor(100); 
            doc.text('QUOTE FROM:\nSalon Chamari,\n523/7 DS Senanayake Mawatha,\nAnuradhapura', 14, 70); 
    
            // array to hold table data
            let tableData = [];
    
            // Push each service as a row to the table data
            selectedServices.forEach(service => {
                tableData.push([
                    service.itemNo,
                    service.itemName,
                    service.quantity,
                    service.itemPrice * service.quantity
                ]);
            });
    
            // Calculate total amount
            let totalAmount = calculateTotalAmount();
            tableData.push(['Total Amount', '', '', `Rs.${totalAmount.toFixed(2)}`]);
    
            // Generate the table
            doc.autoTable({
                head: [['Item No', 'Service Name', 'Number Of Persons', 'Service Price']],
                body: tableData,
                startY: 100, // Adjusted to make space for the address
                theme: 'grid',
                styles: { halign: 'center', font: 'helvetica' }
            });
    
            // Add the quotation date and expiration date on the right side above the table
            let today = new Date();
            let expiryDate = new Date();
            expiryDate.setDate(today.getDate() + 30); // Quotation valid for 30 days
            doc.setFontSize(12);
            doc.setFont('times', 'normal');
            doc.setTextColor(150); 
            doc.text(`Issue Date: ${today.toDateString()}`, 140, 70); 
            doc.text(`Valid Until: ${expiryDate.toDateString()}`, 140, 77); 

            // Contact details aligned at the bottom center of the PDF
            doc.setFontSize(10);
            doc.setFont('courier', 'italic');
            doc.text('We will happy to supply any further information you may need\n Contact Us: +94767455431', 105, doc.internal.pageSize.getHeight() - 20, { align: 'center' });
    
            // Double border for each page
            doc.setLineWidth(1);
            doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10);
            doc.setLineWidth(0.5);
            doc.rect(7, 7, doc.internal.pageSize.getWidth() - 14, doc.internal.pageSize.getHeight() - 14);
    
            // Save the PDF
            doc.save('SalonChamariQuotation.pdf');
        };

    logo.src = SalonLogo; // Use the imported logo image path
    };

    const FormVisibility = () => {
        setShowAppointmentForm(prevState => !prevState);
    };

    const handleClose = () => {
        setShowAppointmentForm(false);
    };

    const handleAppoinment = async(event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('customerName',customerName);
        formData.append('contactNumber',contactNumber);
        formData.append('pdf',quotation);
        formData.append('appointmentDate',appointmentDate);
        formData.append('appointmentTime',appointmentTime);

        try{
            const response = await axios.post('/quotation/newAppointment',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if(response.status === 200){
                Swal.fire({
                    title: '<strong>Done!</strong>',
                    icon: 'success',
                    html:
                        'Appoinment has been <b>successfully</b> placed. ',
                    focusConfirm: false,
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Great!',
                    confirmButtonAriaLabel: 'Thumbs up, great!',
                    timer: 5000
                })
            }
            
        } catch (error){
            Swal.fire({
                title: '<strong>Uh-oh...</strong>',
                icon: 'error',
                html:
                    'We encountered an issue while placing your Appoinment. ',
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-times-circle"></i> I\'ll try again',
                confirmButtonAriaLabel: 'I\'ll try again',
                timer: 5000
            })
        }
    }


    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.headercontainer}><Header/></div>
            <div className={Styles.contentContainer}>
                <h1>Quotation</h1>
                <div className={Styles.headingContainer}>
                    <p>We prioritize your satisfaction above all else.</p>
                    <p>Let us bring your vision to life - submit your request today and experience the difference firsthand</p>
                </div>
                <div className={Styles.dropdownContainer}>
                    <div className={Styles.dropdown}>
                        <label>Pick Category:</label>
                        <select value={selectedService} onChange={handleServiceChange}>
                            <option value="">Select</option>
                            {services.map((service, index) => (
                                <option key={index} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>
                    <div className={Styles.dropdown}>
                        <label>Pick Sub-Category:</label>
                        <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
                            <option value="">Select</option>
                            {subcategories.map((subcategory, index) => (
                                <option key={index} value={subcategory}>{subcategory}</option>
                            ))}
                        </select>
                    </div>
                    <div className={Styles.dropdown}>
                        <label>Pick Service:</label>
                        <select value={selectedServiceItem} onChange={handleServiceItemClick}>
                            <option value="">Select</option>
                            {serviceItems.map((item, index) => (
                                <option key={index} value={item.itemName}>{item.itemName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className={Styles.addServiceBtn} onClick={handleAddService}>Add Service</button>
                <hr></hr>
                <div className={Styles.selectedServicesContainer}>
                    {selectedServices.length > 0 ? (
                        <table className={Styles.serviceTable}>
                            <thead>
                                <tr>
                                    <th>Item No</th>
                                    <th>Service Name</th>
                                    <th>Number Of Persons</th>
                                    <th>Service Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedServices.map((service, index) => (
                                    <tr key={index}>
                                        <td>{service.itemNo}</td>
                                        <td>{service.itemName}</td>
                                        <td className={Styles.quantityadjustment}>
                                            <button onClick={() => handleQuantityChange(index, -1)}><FontAwesomeIcon icon={faMinus}/></button>
                                            <span className={Styles.quantitydisplay}>{service.quantity}</span>
                                            <button onClick={() => handleQuantityChange(index, 1)}><FontAwesomeIcon icon={faPlus}/></button>
                                        </td>
                                        <td>{service.itemPrice * service.quantity}</td>
                                        <td>
                                            <button onClick={() => handleRemoveService(index)} className={Styles.removebtn}><FontAwesomeIcon icon={faTrash}/> </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h4>Your Quote is empty. Please add items to the quote</h4>
                    )}
                    <div className={Styles.totalAmountContainer}>
                        Total Amount: Rs.{calculateTotalAmount()}
                    </div>
                    {selectedServices.length > 0 && (
                        <button className={Styles.downloadPDFBtn} onClick={handleDownloadPDF}>Download Quote</button>
                    )}
                </div>
                <div className={Styles.floatingbutton} onClick={FormVisibility}>
                    Make Appointment
                </div>
                {showAppointmentForm && (
                    <div className={Styles.modalcontainer}>
                      <div className={Styles.appointmentFormContainer}>
                            <form onSubmit={handleAppoinment}>
                                <button onClick={handleClose} className={Styles.closeicon}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <div className={Styles.formField}>
                                    <label htmlFor={Styles.customerName}>Customer Name:</label>
                                    <input
                                        type="text"
                                        id="customerName"
                                        name="customerName"
                                        value={customerName}
                                        onChange={(e) => {setCustomerName(e.target.value)}}
                                        required
                                    />
                                </div>
                                <div className={Styles.formField}>
                                    <label htmlFor="contactNumber">Contact Number:</label>
                                    <input
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={contactNumber}
                                        onChange={(e) => {setContactNumber(e.target.value)}}
                                        required
                                    />
                                </div>
                                <div className={Styles.formField}>
                                    <label htmlFor="pdf">Attach PDF:</label>
                                    <input
                                        type="file"
                                        id="pdf"
                                        name="pdf"
                                        onChange={(e) => {setQuotaionPDF(e.target.files[0])}}
                                        accept=".pdf"
                                        required
                                    />
                                     <p class={Styles.instructionMessage}>*Please attach your generated quote PDF.</p>
                                </div>
                                <div className={Styles.formField}>
                                    <label htmlFor="appointmentDate">Appointment Date:</label>
                                    <input
                                        type="date"
                                        id="appointmentDate"
                                        name="appointmentDate"
                                        value={appointmentDate}
                                        onChange={(e) => {setAppoinmentDate(e.target.value)}}
                                        min={new Date().toISOString().split('T')[0]} 
                                        required
                                    />
                                </div>
                                <div className={Styles.formField}>
                                    <label htmlFor="appointmentTime">Appointment Time:</label>
                                    <input
                                        type="time"
                                        id="appointmentTime"
                                        name="appointmentTime"
                                        value={appointmentTime}
                                        onChange={(e) => {setAppoinmentTime(e.target.value)}}
                                        required
                                    />
                                </div>
                                <button type="submit" className={Styles.formSubmitBtn}>Submit</button>
                            </form>                    
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
