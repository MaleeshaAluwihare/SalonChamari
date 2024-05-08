import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Styles from '../../css/Maleesha/UpdateService.module.css';

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
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred while fetching service data.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    const handleUpdateButtonClick = async () => {
        if (!selectedServiceID) {
            Swal.fire({
                title: 'Select a Service',
                text: 'Please select a service to update.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
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
    
            Swal.fire({
                title: 'Success!',
                text: 'Service updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
    
            // Clear form fields
            setServiceName("");
            setSubCategoryName("");
            setItemName("");
            setItemPrice("");
        } catch (error) {
            console.error('Error updating service:', error);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while updating the service.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    
    useEffect(() => {
        fetchDataForSelectedService();
    }, [selectedServiceID]); // Fetch data whenever selectedServiceID changes

    return(
        <div className={Styles.mainupdatecontainer}>
            <div className={Styles.serviceselectcontainer}>
                <form className={Styles.serviceselectform}>
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
                </form>    
            </div>
            {/* Both forms are displayed here */}
            <div className={Styles.updateservicecontainer}>
                <form className={Styles.updateserviceform}>
                    <div className={Styles.mb3}>
                        <label htmlFor="Category" className={Styles.formlabel}>Category:</label>
                        <input type="text" className={Styles.formcontrol} id="Category" value= {serviceName} readOnly />
                    </div>
                    <div className={Styles.mb3}>
                        <label htmlFor="SubCategory" className={Styles.formlabel}>Sub-Category:</label>
                        <input type="text" className={Styles.formcontrol} id="SubCategory" value={subCategoryName} readOnly />
                    </div>
                    <div className={Styles.mb3}>
                        <label htmlFor="Service" className={Styles.formlabel}>Service Name:</label>
                        <input type="text" className={Styles.formcontrol} id="Service" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    </div>
                    <div className={Styles.mb3}>
                        <label htmlFor="Service price" className={Styles.formlabel}>Service Price:</label>
                        <input type="text" className={Styles.formcontrol} id="Service price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                    </div>
                    <button className={Styles.UpdateServiceBtn} onClick={handleUpdateButtonClick}>Update</button>
                </form>
            </div>
        </div>
    )
}
