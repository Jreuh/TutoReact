import React from "react";

export default function Pagination({ goToNextPage, goToPreviousPageUrl }) {
  return (
    <div>
      {goToPreviousPageUrl && (
        <button onClick={goToPreviousPageUrl}>Previous</button>
      )}
      {goToNextPage && <button onClick={goToNextPage}>Next</button>}
    </div>
  );
}
