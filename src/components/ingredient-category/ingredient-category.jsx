import React from 'react';
import {data} from '../../utils/data.js'
import Ingredient from "../ingredient/ingredient";
import styles from './ingredient-category.module.css'

function IngredientCategory({label, type}) {
    return (
        <>
            <p className="text text_type_main-medium mt-10 mb-6">{label}</p>
            <div className={styles.list + ` ml-4`}>
                {Array.from(data).map((element) => {
                    if (element.type === type)
                        return <Ingredient key={element.id} element={element} />;
                })}
            </div>
        </>
    );
}

export default IngredientCategory;
