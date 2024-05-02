import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../css/Maleesha/DeleteService.css';

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
            Swal.fire({
                title: 'Oops...',
                text: 'Please select a service to remove.',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'btn btn-warning'
                },
                timer: 5000
            });
            return;
        }
            Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-secondary mx-2'
            },
            timer: 5000
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/services/itemsDelete/${selectedServiceID}`);
                    // Refresh data after deletion
                    fetchSubcategories(selectedService);
                    fetchServiceItems(selectedSubcategory);
                    setSelectedServiceItem('');
                    setSelectedServiceID('');
                    
                    Swal.fire({
                        title: 'Success!',
                        text: 'Service removed successfully.',
                        icon: 'success',
                        confirmButtonText: 'Great!',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        },
                        timer: 5000
                    });
                    
                } catch (error) {
                    console.error('Error removing service:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while removing the service.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        customClass: {
                            confirmButton: 'btn btn-danger'
                        },
                        timer: 5000
                    });
                }
            }
        });
    };
    
    return(
        <div className='main-delete-container'>
            <div className='dropdownContainer'>
                <div className='dropdown'>
                    <label>Pick Category:</label>
                    <select id = "Category" className="form-select" value={selectedService} onChange={handleServiceChange}>
                        <option value="">Select</option>
                        {services.map((service, index) => (
                            <option key={index} value={service}>{service}</option>
                        ))}
                    </select>
                </div>
                <div className='dropdown'>
                    <label>Pick Sub-Category:</label>
                    <select id= "Sub-Category" className="form-select" value={selectedSubcategory} onChange={handleSubcategoryChange}>
                        <option value="">Select</option>
                        {subcategories.map((subcategory, index) => (
                            <option key={index} value={subcategory}>{subcategory}</option>
                        ))}
                    </select>
                </div>
                <div className='dropdown'>
                    <label>Pick Service:</label>
                    <select id='Service' className="form-select" value={selectedServiceItem} onChange={handleServiceItemClick}>
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
