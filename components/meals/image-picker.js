"use client";

import { useRef } from "react";

import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  const imageInputRef = useRef();

  function handlePickClick() {
    imageInputRef.current.click();
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
