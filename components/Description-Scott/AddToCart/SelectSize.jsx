/* eslint-disable */
import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const SelectSize = () => {
  var [currentSize, setCurrentSize] = useState('Select Size')
  // hardcoded defaults for now
  var [sizesAvailable, setSizesAvailable] = useState([15, 16, 17]);
  var [disableDropdown, setDisableDropdown] = useState(false);

  const nothingInStock = () => {
    if(sizesAvailable.length === 0) {
      setCurrentSize('Out of stock')
      setDisableDropdown(true);
    }
  }

  useEffect(()=> nothingInStock(), [sizesAvailable])
  return (
    <DropdownButton disabled={disableDropdown} id="dropdown-basic-button" title={currentSize}>
        <Dropdown.Item>Select Size</Dropdown.Item>
      {sizesAvailable.length > 0 ? sizesAvailable.map((size) => (
        <Dropdown.Item onClick={() => setCurrentSize(size)} key={size}>{`${size}`}</Dropdown.Item>
      )) : <span/> }
    </DropdownButton>

  )
}
  export default SelectSize;