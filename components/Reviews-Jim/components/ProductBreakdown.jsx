/* eslint-disable */
import React, { useState, useEffect } from 'react';

const ProductBreakdown = ({ characteristics }) => {

  const charScaleCreator = (value) => {
    return Math.floor(125 / Number(value));
  }

  const charKeys = Object.keys(characteristics);

  return (
    <div>
      {charKeys.includes('Size') ?
        <div className="char-rating">
          <div>Size</div>
          <div className="char-mark">◆</div>
          <div className="char-bar">*</div>
          <div className="char-labels">
            <span className="char-left">Too small</span>
            <span className="char-middle">Perfect</span>
            <span className="char-right">Too big</span>
          </div>
          <style jsx>
            {`
              .char-mark {
                margin-left: ${charScaleCreator(characteristics.Size.value)}%;
              }
            `}
          </style>
        </div> : null}
      {charKeys.includes('Width') ?
        <div className="char-rating">
          <div>Width</div>
          <div className="char-mark">◆</div>
          <div className="char-bar">*</div>
          <div className="char-labels">
            <span className="char-left">Too narrow</span>
            <span className="char-middle">Perfect</span>
            <span className="char-right">Too wide</span>
          </div>
          <style jsx>
            {`
              .char-mark {
                margin-left: ${charScaleCreator(characteristics.Width.value)}%;
              }
            `}
          </style>
        </div> : null}
        {charKeys.includes('Comfort') ?
        <div className="char-rating">
          <div>Comfort</div>
          <div className="char-mark">◆</div>
          <div className="char-bar">*</div>
          <div className="char-labels">
            <span className="char-left">Uncomfortable</span>
            <span className="char-middle">Ok</span>
            <span className="char-right">Perfect</span>
          </div>
          <style jsx>
            {`
              .char-mark {
                margin-left: ${charScaleCreator(characteristics.Comfort.value)}%;
              }
            `}
          </style>
        </div> : null}
      {charKeys.includes('Quality') ?
        <div className="char-rating">
          <div>Quality</div>
          <div className="char-mark">◆</div>
          <div className="char-bar">*</div>
          <div className="char-labels">
            <span className="char-left">Poor</span>
            <span className="char-middle">Expected</span>
            <span className="char-right">Perfect</span>
          </div>
          <style jsx>
            {`
              .char-mark {
                margin-left: ${charScaleCreator(characteristics.Quality.value)}%;
              }
            `}
          </style>
        </div> : null}
        {charKeys.includes('Length') ?
        <div className="char-rating">
          <div>Length</div>
          <div className="char-mark">◆</div>
          <div className="char-bar">*</div>
          <div className="char-labels">
            <span className="char-left">Runs short</span>
            <span className="char-middle">Perfect</span>
            <span className="char-right">Runs long</span>
          </div>
          <style jsx>
            {`
              .char-mark {
                margin-left: ${charScaleCreator(characteristics.Length.value)}%;
              }
            `}
          </style>
        </div> : null}
      {charKeys.includes('Fit') ?
        <div className="char-rating">
          <div>Fit</div>
          <div className="char-mark">◆</div>
          <div className="char-bar">*</div>
          <div className="char-labels">
            <span className="char-left">Runs tight</span>
            <span className="char-middle">Perfect</span>
            <span className="char-right">Runs loose</span>
          </div>
          <style jsx>
            {`
              .char-mark {
                margin-left: ${charScaleCreator(characteristics.Fit.value)}%;
              }
            `}
          </style>
        </div> : null}
    </div>
  );
};

export default ProductBreakdown;