import React from "react";
import "./LoadingSpinner.css"; 

function LoadingSpinner() {
  return (
    <div className="ark-spinner">
      <div className="lds-dual-ring"></div>
      <span>Cargando posts de supervivencia...</span>
    </div>
  );
}

export default LoadingSpinner;