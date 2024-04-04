import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DeleteService(){

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [serviceItems, setServiceItems] = useState([]);
    const [selectedServiceItem, setSelectedServiceItem] = useState('');
    const [selectedServiceID, setSelectedServiceID] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            const response = await axios.get('/quotation/allServices');
            setServices(response.data);
        };
        fetchServices();
    }, []);

    const fetchSubcategories = async (serviceName) => {
        const response = await axios.get(`/quotation/subcategories/${serviceName}`);
        setSubcategories(response.data);
    };

    const fetchServiceItems = async (subCategoryName) => {
        const response = await axios.get(`/quotation/serviceitems/${subCategoryName}`);
        setServiceItems(response.data);
    };

    const handleServiceChange = async (event) => {
        const serviceName = event.target.value;
        setSelectedService(serviceName);
        setSelectedSubcategory('');
        fetchSubcategories(serviceName);
    };

    const handleSubcategoryChange = async (event) => {
        const subCategoryName = event.target.value;
        setSelectedSubcategory(subCategoryName);
        fetchServiceItems(subCategoryName);
    };

    const handleServiceItemClick = (event) => {
        const selectedItem = event.target.value;
        const selectedItemInfo = serviceItems.find(item => item.itemName === selectedItem);
        setSelectedServiceItem(selectedItem);
        setSelectedServiceID(selectedItemInfo ? selectedItemInfo.itemID : '');
    };

    const handleRemoveButtonClick = async () => {
        if (!selectedServiceID) {
            alert('Please select a service item to remove.');
            return;
        }

        try {
            await axios.delete(`/services/itemsDelete/${selectedServiceID}`);
            // Refresh data after deletion
            fetchSubcategories(selectedService);
            fetchServiceItems(selectedSubcategory);
            setSelectedServiceItem('');
            setSelectedServiceID('');
            alert('Service item removed successfully.');
            
        } catch (error) {
            console.error('Error removing service item:', error);
            alert('An error occurred while removing the service item.');
        }
    };

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
            <button className='DeleteServiceBtn' onClick={handleRemoveButtonClick}>Remove</button>
        </div>
    )
}
