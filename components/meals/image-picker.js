"use client";

import { useRef, useState } from "react";

import classes from "./image-picker.module.css";

/**
 * ImagePicker Component
 *
 * Provides a custom file picker for image uploads.
 * - Replaces the default file input with a styled button
 * - Lets users pick an image from their device
 * - Generates and displays a preview using FileReader
 */
export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInputRef = useRef();

  function handlePickClick() {
    imageInputRef.current.click();
  }

  function handleImageChange(event) {
    // Access the selected file (FileList is available on input[type="file"])
    const file = event.target.files[0];

    // Guard clause: if no file is picked, reset preview and exit
    if (!file) {
      setPickedImage(null);
      return;
    }

    // Use FileReader to convert the file into a data URL for image preview
    const fileReader = new FileReader();

    // Once FileReader is done, update state with the generated data URL
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    // Start reading the file as a data URL (async, triggers onload above)
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className="classes.controls">
        <input
          ref={imageInputRef}
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
