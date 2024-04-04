import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../css/Maleesha/Quotation.css';
import 'jspdf-autotable';

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
            // If any dropdown is not selected, display a warning message and return without adding the service
            alert('Please select all fields');
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
        
        // Add a title to the PDF
        doc.text('Quotation', 10, 10);
        
        //Generate the table
        doc.autoTable({ html: '#serviceTable' });

        // Add total amount
        let totalAmount = selectedServices.reduce((acc, service) => acc + (service.itemPrice * service.quantity), 0);
        doc.text(`Total Amount: Rs.${totalAmount.toFixed(2)}`, 10, doc.autoTable.previous.finalY + 10);

        // Save the PDF
        doc.save('quotation.pdf');
    };

    return (
        <div className='mainContainer'>
            <div className='contentContainer'>
                <h1>Quotation</h1>
                <div className='headingContainer'>
                    <p>We prioritize your satisfaction above all else.</p>
                    <p>Let us bring your vision to life - submit your request today and experience the difference firsthand</p>
                </div>
                <div className='dropdownContainer'>
                    <div className='dropdown'>
                        <label>Pick Category:</label>
                        <select value={selectedService} onChange={handleServiceChange}>
                            <option value="">Select</option>
                            {services.map((service, index) => (
                                <option key={index} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>
                    <div className='dropdown'>
                        <label>Pick Sub-Category:</label>
                        <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
                            <option value="">Select</option>
                            {subcategories.map((subcategory, index) => (
                                <option key={index} value={subcategory}>{subcategory}</option>
                            ))}
                        </select>
                    </div>
                    <div className='dropdown'>
                        <label>Pick Service:</label>
                        <select value={selectedServiceItem} onChange={handleServiceItemClick}>
                            <option value="">Select</option>
                            {serviceItems.map((item, index) => (
                                <option key={index} value={item.itemName}>{item.itemName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className="addServiceBtn" onClick={handleAddService}>Add Service</button>
                <hr></hr>
                <div className="selectedServicesContainer">
                    {selectedServices.length > 0 ? (
                        <table className='serviceTable'>
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
                                        <td>
                                            <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                                            {service.quantity}
                                            <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                                        </td>
                                        <td>{service.itemPrice * service.quantity}</td>
                                        <td>
                                            <button onClick={() => handleRemoveService(index)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h4>Your Quote is empty. Please add items to the quote</h4>
                    )}
                    <div className="totalAmountContainer">
                        Total Amount: Rs.{calculateTotalAmount()}
                    </div>
                    {selectedServices.length > 0 && (
                        <button className="downloadPDFBtn" onClick={handleDownloadPDF}>Download Quote</button>
                    )}
                </div>
                <hr></hr>
            </div>
        </div>
    );
}
