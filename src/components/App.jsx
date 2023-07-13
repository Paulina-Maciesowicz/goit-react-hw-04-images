import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
// import { key } from '../asset/pass';
import css from './App.module.css';
import { fetchData } from '../fetchData.js';

// console.log(key);
export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const func = async () => {
      try {
        const data = await fetchData(query, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    func();
  }, [query, page]);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageSelection = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />
      {error && <p>Something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGallery
            images={images}
            id={nanoid}
            setSelectedImage={handleImageSelection}
          />
          <Button onClick={handleLoadMore} />
        </>
      )}
      {selectedImage && (
        <Modal imageUrl={selectedImage} onCloseModal={handleCloseModal} />
      )}
    </div>
  );
};
