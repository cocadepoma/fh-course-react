import React, { useState } from "react";
import { AddCategory } from "./components/AddCategory";
import { GiftGrid } from "./components/GiftGrid";

const GifExpertApp = ( {defaultCategories = []}) => {
    const [categories, setCategories] = useState(defaultCategories);

    return (
        <div>
            <h2>Gif Expert App</h2>
            <AddCategory setCategories={setCategories} />
            <hr />
            <ol>
                {categories.map((category) => (
                    <GiftGrid key={category} category={category} />
                ))}
            </ol>
        </div>
    );
};

export default GifExpertApp;
