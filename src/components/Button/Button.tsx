// Importing necessary modules and components
import React, { useState } from 'react';
import Modal from 'react-modal';
import "./Button.scss";

// Defining the properties for the Button component
interface ButtonProps {
    label: string;
}

// Defining the Button component
const Button: React.FC<ButtonProps> = ({ label }) => {
    
    // Defining state variables
    const [ isModalOpen, setIsModalOpen ] = useState(false); // State for modal visibility
    const [ storeName, setStoreName ] = useState(''); // State for store name
    const [ productName, setProductName ] = useState(''); // State for product name
    const [ productPicture, setProductPicture ] = useState<File | null>(null); // State for product picture
    const [ companyPicture, setCompanyPicture ] = useState<File | null>(null); // State for company picture
    const [ stockNumber, setStockNumber ] = useState(''); // State for stock number
    const [ pickupTime, setPickupTime ] = useState('');

    // Function to open the modal
    const openModal = () => setIsModalOpen(true);

    // Function to close the modal
    const closeModal = () => setIsModalOpen(false);

    // Function to handle button click
    const handleButtonClick = () => {
        openModal();
    };

    // Function to handle picture change
    const handleProductPictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setProductPicture(file);
    };

    const handleCompanyPictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      setCompanyPicture(file);
    }

    // Function to handle form submission
    const handleSubmit = () => {
        closeModal();
    }
    
    // Rendering the Button component
    return (
      <div>
      <button className="customize-button" onClick={handleButtonClick}>
        {label}
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Information Modal"
        className="customize-modal" // Add custom modal class for styling
        overlayClassName="customize-overlay" // Add custom overlay class for styling
      >
        <div className="modal-content">
          <h2 className="modal-title">Enter Product Information</h2>
          <label className="modal-label">
            Store Name:
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="modal-input"
            />
          </label>
          <br />
          <label className="modal-label">
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="modal-input"
            />
          </label>
          <br />
          <label className="modal-label">
            Upload Product Picture:
            <input
              type="file"
              accept="image/*"
              onChange={handleProductPictureChange}
              className="modal-input"
            />
          </label>
          <br />
          <label className="modal-label">
            Upload Company Picture:
            <input
              type="file"
              accept="image/*"
              onChange={handleCompanyPictureChange}
              className="modal-input"
            />
          </label>
          <br />
          <label className="modal-label">
            Stock Number:
            <input
              type="text"
              value={stockNumber}
              onChange={(e) => setStockNumber(e.target.value)}
              className="modal-input"
            />
          </label>
          <br />
          <br />
          <label className="modal-label">
            Pickup Time:
            <input
              type="text"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="modal-input"
            />
          </label>
          <button className="final-button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="final-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
    );
};

// Exporting the Button component
export default Button;