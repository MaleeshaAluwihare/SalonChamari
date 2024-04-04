import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateService(){

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [serviceItems, setServiceItems] = useState([]);
    const [selectedServiceItem, setSelectedServiceItem] = useState('');
    const [selectedServiceID, setSelectedServiceID] = useState('');
    const [selectedServiceData, setSelectedServiceData] = useState(null); // Added state to store selected service data

    const [ serviceName, setServiceName ] = useState("");
    const [ subCategoryName, setSubCategoryName ] = useState("");
    const [ itemName, setItemName ] = useState("");
    const [ itemPrice, setItemPrice ] = useState("");

    useEffect(() => {
        const fetchServices = async () => {
            const response = await axios.get('/quotation/allServices');
            setServices(response.data);
        };
        fetchServices();
    }, []);

    const handleServiceChange = async (event) => {
        const serviceName = event.target.value;
        setSelectedService(serviceName);
        setSelectedSubcategory('');
        const response = await axios.get(`/quotation/subcategories/${serviceName}`);
        setSubcategories(response.data);
    };

    const handleSubcategoryChange = async (event) => {
        const subCategoryName = event.target.value;
        setSelectedSubcategory(subCategoryName);
        const response = await axios.get(`/quotation/serviceitems/${subCategoryName}`);
        setServiceItems(response.data);
    };

    const handleServiceItemClick = (event) => {
        const selectedItem = event.target.value;
        const selectedItemInfo = serviceItems.find(item => item.itemName === selectedItem);
        setSelectedServiceItem(selectedItem);
        setSelectedServiceID(selectedItemInfo ? selectedItemInfo.itemID : '');
    };

    const fetchDataForSelectedService = async () => {
        if (selectedServiceID) {
            try {
                const response = await axios.get(`/services/itemsGet/${selectedServiceID}`);
                setSelectedServiceData(response.data.service);
                
                // Set form fields to initial values
                setServiceName(response.data.service.serviceName);
                setSubCategoryName(response.data.service.subCategoryName);
                setItemName(response.data.service.itemName);
                setItemPrice(response.data.service.itemPrice);

            } catch (error) {
                console.error('Error fetching service data:', error);
                alert('An error occurred while fetching service data.');
            }
        }
    };

    const handleUpdateButtonClick = async () => {
        if (!selectedServiceID) {
            alert('Please select a service to update.');
            return;
        }

        const updatedService = {
            serviceName,
            subCategoryName,
            itemName,
            itemPrice
        };
        try {
            await axios.put(`/services/itemsUpdate/${selectedServiceID}`, updatedService);
            alert('Service updated successfully.');
        } catch (error) {
            console.error('Error updating service:', error);
            alert('An error occurred while updating the service.');
        }
    };

    useEffect(() => {
        fetchDataForSelectedService();
    }, [selectedServiceID]); // Fetch data whenever selectedServiceID changes

    return(
        <div className='MainContainer'>
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
            {selectedService && (
                <div className="container">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="Category" className="form-label">Category:</label>
                            <input type="text" className="form-control" id="Category" value= {serviceName} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="SubCategory" className="form-label">Sub-Category:</label>
                            <input type="text" className="form-control" id="SubCategory" value={subCategoryName} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Service" className="form-label">Service Name:</label>
                            <input type="text" className="form-control" id="Service" value={itemName} onChange={(e) => setSelectedServiceItem(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Service price" className="form-label">Service Price:</label>
                            <input type="text" className="form-control" id="Service price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                        </div>
                        <button className='UpdateServiceBtn' onClick={handleUpdateButtonClick}>Update</button>
                    </form>
                </div>
            )}
        </div>
    )
}
