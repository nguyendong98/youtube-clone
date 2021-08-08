import React, {useState} from 'react';
import './_categortyBar.scss';
import {useDispatch} from 'react-redux';
import {getVideosByCategory} from 'actions/videos.action';
import {useTranslation} from 'react-i18next';


export default function CategoryBar() {

    const [activeElement, setActiveElement] = useState('Tất cả');
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleSearchByCategory = value => {
        setActiveElement(value);
        dispatch(getVideosByCategory(value));
    }
    const categories = [
        t('categoriesBar.all'), t('categoriesBar.combineList'), t('categoriesBar.music'),
        t('categoriesBar.cookingShow'), t('categoriesBar.travel'), t('categoriesBar.situationComedy'),
        t('categoriesBar.football'), t('categoriesBar.live'), t('categoriesBar.cartoon'),
        t('categoriesBar.pet'), t('categoriesBar.actionGame'), t('categoriesBar.languageOfLegend')
    ]

    return (
        <div className="categories-bar">
            {categories.map((value, i) => (
                <span
                    key={i}
                    className={activeElement === value ? "active" : ""}
                    onClick={() => handleSearchByCategory(value)}>
                    { value }
                </span>
            ))}
        </div>
    )
}
