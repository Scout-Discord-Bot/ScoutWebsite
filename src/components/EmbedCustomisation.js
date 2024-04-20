import React, { useState } from 'react';
import axios from 'axios';
import './EmbedCustomisation.css';
import ColorPicker from './ColourPicker';

const EmbedCustomisation = () => {
  const [embedConfig, setEmbedConfig] = useState({
    author: { name: '', icon_url: '' },
    color: '',
    title: '',
    url: '',
    description: '',
    fields: [],
    footer: { text: '', icon_url: '' },
    image: { url: '' },
  });

  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorClose = () => {
    setShowColorPicker(false);
  };

  const handleColorChange = (color) => {
    setEmbedConfig({ ...embedConfig, color: color.hex });
  };

  const handleChange = (e) => {
    setEmbedConfig({ ...embedConfig, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setEmbedConfig({
        ...embedConfig,
        [type]: { ...embedConfig[type], icon_url: response.data.url },
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const addField = () => {
    const newField = { name: '', value: '' };
    setEmbedConfig({ ...embedConfig, fields: [...embedConfig.fields, newField] });
  };

  const removeField = (index) => {
    const newFields = [...embedConfig.fields];
    newFields.splice(index, 1);
    setEmbedConfig({ ...embedConfig, fields: newFields });
  };

  return (
    <div className="embed-customisation">
      <div className="color-dot" onClick={handleColorClick}></div>
      {showColorPicker ? (
        <div className="color-picker">
          <div className="color-picker-cover" onClick={handleColorClose} />
          <ColorPicker
            color={embedConfig.color}
            onColorChange={handleColorChange}
          />
        </div>
      ) : null}
      <input type="file" id="author-image-upload" onChange={(e) => handleFileUpload(e, 'author')} />
      <label htmlFor="author-image-upload">Upload Author Image</label>
      <input
        type="text"
        name="author"
        value={embedConfig.author.name}
        onChange={handleChange}
        placeholder="Author Name"
      />
      <input
        type="text"
        name="title"
        value={embedConfig.title}
        onChange={handleChange}
        placeholder="Title Text"
      />
      <textarea
        name="description"
        value={embedConfig.description}
        onChange={handleChange}
        placeholder="Message Template"
        maxLength="2000"
      />
      <button onClick={addField}>Add Fields</button>
      {embedConfig.fields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            name={`field-name-${index}`}
            value={field.name}
            onChange={handleChange}
            placeholder="Field Name"
          />
          <input
            type="text"
            name={`field-value-${index}`}
            value={field.value}
            onChange={handleChange}
            placeholder="Field Value"
          />
          <button onClick={() => removeField(index)}>Remove Field</button>
        </div>
      ))}
      <input type="file" id="footer-image-upload" onChange={(e) => handleFileUpload(e, 'footer')} />
      <label htmlFor="footer-image-upload">Upload Footer Image</label>
      <input
        type="text"
        name="footer"
        value={embedConfig.footer.text}
        onChange={handleChange}
        placeholder="Footer Text"
      />
      <input type="file" id="large-image-upload" onChange={(e) => handleFileUpload(e, 'image')} />
      <label htmlFor="large-image-upload">Upload Large Image</label>
    </div>
  );
};

export default EmbedCustomisation;