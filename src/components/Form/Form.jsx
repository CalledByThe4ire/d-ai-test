import React, { useState } from 'react';
import styles from './Form.module.scss';

const initialState = {
  text: '',
  gender: 'Male',
};

const Form = () => {
  const [formData, setFormData] = useState(
    JSON.parse(window.localStorage.getItem('formData')) ?? initialState
  );
  const [, setInputTextValue] = useState(formData.text);

  const handleInputTextChange = ({ target: { value } }) => {
    setFormData({ ...formData, text: value });
    setInputTextValue(value);
  };

  const handleInputRadioChange = ({ target: { value } }) => {
    setFormData({ ...formData, gender: value });
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const { target } = evt;
    const formData = Object.fromEntries(new FormData(target));

    window.localStorage.setItem('formData', JSON.stringify(formData));
  };

  const handleLoadButtonClick = (evt) => {
    evt.preventDefault();

    setFormData(JSON.parse(window.localStorage.getItem('formData')));
  };

  return (
    <form className={styles.Form} onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="text"
        className={styles.FormInputText}
        onChange={handleInputTextChange}
        value={formData.text}
        placeholder="Start typing…"
      />

      <div className={styles.FormInputGroup}>
        <input
          type="radio"
          id="gender-male"
          className={styles.FormInputRadio}
          value="male"
          checked={formData.gender === 'male'}
          onChange={handleInputRadioChange}
          name="gender"
        />
        <label htmlFor="gender-male" className={styles.FormInputLabel}>
          Male
        </label>
        <input
          type="radio"
          id="gender-female"
          className={styles.FormInputRadio}
          value="female"
          checked={formData.gender === 'female'}
          onChange={handleInputRadioChange}
          name="gender"
        />
        <label htmlFor="gender-female" className={styles.FormInputLabel}>
          Female
        </label>
        <input
          type="radio"
          id="gender-other"
          className={styles.FormInputRadio}
          value="other"
          checked={formData.gender === 'other'}
          onChange={handleInputRadioChange}
          name="gender"
        />
        <label htmlFor="gender-other" className={styles.FormInputLabel}>
          Other
        </label>
      </div>

      <input
        type="submit"
        className={styles.FormInputSubmit}
        onSubmit={handleFormSubmit}
      />
      <input
        type="button"
        className={styles.FormInputReset}
        value="Load"
        onClick={handleLoadButtonClick}
      />
    </form>
  );
};

export default Form;
