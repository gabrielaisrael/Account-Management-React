import { useEffect, useState } from 'react';
import { categories } from '../../data/categories';
import { items } from '../../data/items';
import { Item } from '../../types/Items';
import * as C from './styled';

type Props = {
    onShowModal: () => void;
    onAddItem: ({ title, category, value }: Item) => void;
}

type categorieOption = {
    category: string;
    title?: string;
}

const ModalAddItem = ({ onShowModal, onAddItem }: Props) => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState(0);

    const [categoriesOption, setCategoriesOption] = useState<categorieOption[]>([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        let newCategories = [];

        for (let i in items) {
            newCategories.push({
                category: items[i].category,
                title: categories[items[i].category].title
            });
        }

        setCategoriesOption(newCategories);
    }

    const closeModal = (e: any) => {
        if (e.target.classList.contains("modal")) {
            onShowModal();
        }
        else {

        }
    }

    const handleAddItem = () => {
        if (validateForm()) {

            const item: Item = {
                title: title,
                category: category,
                value: value,
                date: new Date()
            }

            onAddItem(item);
            onShowModal();
        }
    }

    const validateForm = () => {

        let ok = true;

        if (title == '') {
            ok = false;
            alert("יש למלא שם");
        }

        if (category == '') {
            ok = false;
            alert("יש לבחור סוג");
        }

        if (value == 0) {
            ok = false;
            alert("יש למלא סכום");
        }

        return ok;
    }

    return (
        <C.Container className="modal" onClick={closeModal}>
            <C.Content>
                <C.Body>
                    <C.ValueArea>
                        <C.ValueText>סכום</C.ValueText>
                        <C.InputValue
                            price={value}
                            type="number"
                            placeholder="Ex: 23.50"
                            onChange={e => setValue(parseFloat(e.target.value))}
                            value={value}
                        />
                    </C.ValueArea>
                    <C.CategoryArea>
                        <C.CategoryTitle>סוג</C.CategoryTitle>
                        <C.CategorySelect
                            category={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            <C.CategoryOption value="">בחר סוג</C.CategoryOption>
                            {categoriesOption.map((item, key) => (
                                <C.CategoryOption
                                    key={key}
                                    value={item.category}
                                >{item.title}</C.CategoryOption>
                            ))}
                        </C.CategorySelect>
                    </C.CategoryArea>
                    <C.TitleArea>
                        <C.Title>שם</C.Title>
                        <C.InputTitle
                            title={title}
                            type="text"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                            placeholder="שם הוצאה/הכנסה"
                        />
                    </C.TitleArea>
                </C.Body>
                <C.Footer>
                    <C.BtnAdd
                        onClick={handleAddItem}
                    >הוסף</C.BtnAdd>
                </C.Footer>
            </C.Content>
        </C.Container>
    )
}


export default ModalAddItem;