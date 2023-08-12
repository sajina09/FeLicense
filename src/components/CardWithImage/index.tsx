import React from 'react';
import './styles.css';

interface CardWithImageProps {
  title: string;
  description: string;
  imageSrc: string;
}

const CardWithImage: React.FC<CardWithImageProps> = ({ title, description, imageSrc }) => {
  return (
    <div className="card-with-image">
      <div className="card-image-container">
        <img className="card-image" src={imageSrc} alt="Card Image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default CardWithImage;
