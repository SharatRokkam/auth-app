import React from "react";

export default function Card({ title, text, children }) {
    return (
        <div className="card">
            <div className="card-head">
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                <p>{text}</p>
                {children}
            </div>
        </div>
    );
}
