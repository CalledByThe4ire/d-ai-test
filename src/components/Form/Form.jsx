import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  text: '',
  gender: '',
};

const Form = () => {
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    window.localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const { target } = evt;
    const formData = Object.fromEntries(new FormData(target));

    window.localStorage.setItem('formData', JSON.stringify(formData));

    setFormData(formData);

    console.log(formData);
  };

  const handleClick = (evt) => {
    evt.preventDefault();

    setFormData(initialState);
    window.localStorage.setItem('formData', JSON.stringify(formData));
    console.log(formData);
  };

  return (
    <form className="app__form form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        className="form__input"
        onChange={handleChange}
        value={inputValue}
      />

      <div className="form__group form-group">
        <input
          type="radio"
          className="form-group__radio"
          value="Male"
          name="gender"
        />{' '}
        Male
        <input
          type="radio"
          className="form-group__radio"
          value="Female"
          name="gender"
        />{' '}
        Female
        <input
          type="radio"
          className="form-group__radio"
          value="Other"
          name="gender"
        />{' '}
        Other
      </div>

      <input type="submit" onSubmit={handleSubmit} />
      <input type="reset" onClick={handleClick} />
    </form>
  );
};

Form.propTypes = {};

export default Form;
