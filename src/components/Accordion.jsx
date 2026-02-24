import { useState } from "react";

export default function Accordion({ triggerContent }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion">
      <h3 className="accordion-title-heading">
        <button
          className="accordion-title-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {triggerContent}
          <span>{isOpen ? "-" : "+"}</span>
        </button>
      </h3>
    </div>
  );
}
