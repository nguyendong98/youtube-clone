import React, {useState} from 'react';
import './_categortyBar.scss';
import {useDispatch} from 'react-redux';
import {getVideosByCategory} from 'actions/videos.action';

const categories = [
    'Tất cả', 'Danh sách kết hợp', 'Âm nhạc', 'Chương trình nấu ăn', 'Du lịch', 'Hài kịch tình huống', 'Đọc rap', 'Bóng đá',
    'Trực tiếp', 'Hoạt hình', 'Thú cưng', 'Trò chơi hành động phiêu lưu', 'Football', 'Real Madrid', 'Gatsby', 'Poor coder', 'Vue js'
]

export default function CategoryBar() {

    const [activeElement, setActiveElement] = useState('Tất cả');
    const dispatch = useDispatch();

    const handleSearchByCategory = value => {
        setActiveElement(value);
        dispatch(getVideosByCategory(value));
    }

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
