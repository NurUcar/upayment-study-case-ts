import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import TopBar from '../../components/topbar';

import { CategoriesActions } from '../../store/categories/reducer';
import { ProductActions } from '../../store/products/reducer';
import { RootState } from "../../store/rootReducer";

import constraints from "../../errorHandler/product/constraints";
import validator from '../../util/validator';
import notify from "../../util/notify";
import Categories from "../../services/types/categoriesInterface";

const AddProduct: FC = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {categories, categoriesErrorMessage} = useSelector((state: RootState) => state.categories);
    const {productInfoMessage, productErrorMessage} = useSelector((state: RootState) => state.products);

    const [categoryList, setCategoryList] = useState<Categories>();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [avatar, setavatar] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<string>('');
    const [categoryError, setCategoryError] = useState<string>('');
    const [avatarError, setAvatarError] = useState<string>('');
    const [priceError, setPriceError] = useState<string>('');
    
    useEffect(() =>{
        if(categories === null)
            dispatch(CategoriesActions.getCategories());
        else
            setCategoryList(categories);       
    },[categories]);
 
    useEffect(() => {
        if (categoriesErrorMessage) {
            notify.error(categoriesErrorMessage);
            dispatch(CategoriesActions.setCategoriesErrorMessage(""));
            dispatch(CategoriesActions.getCategories());
        }
    }, [ categoriesErrorMessage]);

    useEffect(() => {
        if (productInfoMessage) {
            notify.info(productInfoMessage);
            dispatch(ProductActions.getProducts()); 
            dispatch(ProductActions.setProductInfoMessage(""));
            navigate(`/`);  
        }
        if (productErrorMessage) {
            notify.error(productErrorMessage);
            dispatch(ProductActions.setProductErrorMessage(""));
        }
    }, [productInfoMessage, productErrorMessage]);

    const onSaveClick = () => {
        
        const errors: any = [];

        let error: any = validator(constraints)("name", name);
        (error == null || errors.push(error)) && setNameError(error); 
        error = validator(constraints)("description", description);
        (error == null || errors.push(error)) && setDescriptionError(error); 
        error = validator(constraints)("avatar", avatar);
        (error == null || errors.push(error)) && setAvatarError(error); 
        error = validator(constraints)("category", category);
        (error == null || errors.push(error)) && setCategoryError(error); 
        error = validator(constraints)("price", price);
        (error == null || errors.push(error)) && setPriceError(error); 

        if (errors.length === 0)
            dispatch(ProductActions.createProduct(avatar, category, description, "nur0ucar@gmail.com", name, Number(price)));        
    };
    const onBackClick = () => {
        
        navigate(`/`);  
    }

    return(
        <div >
            <TopBar/>
            <div className='flex flex-column mt-8 justify-content-center align-items-center'>
                <div className='flex flex-column w-4 pr-6 pl-6 pb-6 shadow-2'>
                    
                    <h2 className='flex justify-content-center align-items-center'>Add New Product</h2>
                     <InputText 
                         value = {name} 
                         placeholder="Name"
                         onChange={(e) => {setName(e.target.value); setNameError('')}} 
                     />
                     {nameError &&
                     <div className="flex justify-content-end">
                         <small id="name-help" className="p-error p-d-block">{nameError}</small>
                     </div>
                    }

                     <InputTextarea rows={5} cols={15}
                         value = {description} 
                         autoResize
                         placeholder='Description'
                         onChange={(e) => {setDescription(e.target.value); setDescriptionError('')}} 
                         className="mt-3"
                     />
                     {descriptionError &&
                     <div className="flex justify-content-end">
                         <small id="name-help" className="p-error p-d-block">{descriptionError}</small>
                     </div>
                    }

                    <InputText 
                        value = {avatar} 
                        placeholder="Image URL"
                        onChange={(e) => {setavatar(e.target.value); setAvatarError('')}} 
                        className="mt-3"
                    />
                    {avatarError &&
                    <div className="flex justify-content-end">
                        <small id="name-help" className="p-error p-d-block">{avatarError}</small>
                    </div>
                    }

                    <Dropdown
                        value = {category} 
                        options={categoryList ? categoryList.categories.map((item) => {
                            return { label: item.name, value: item.name };
                        }):[] } 
                        onChange={(e) => {setCategory(e.target.value); setCategoryError('');}} 
                        placeholder='Choose Product Category'
                        className="mt-3"
                    /> 
                    {categoryError && (
                        <div className="flex justify-content-end">
                             <small id="name-help" className="p-error p-d-block"> {categoryError}</small>
                        </div>
                     )}

                    <InputText 
                         value = {price} 
                        placeholder="Price"
                         onChange={(e) => {setPrice(e.target.value); setPriceError('')}} 
                         className="mt-3"
                    />
                    {priceError &&
                    <div className="flex justify-content-end">
                        <small id="name-help" className="p-error p-d-block">{priceError}</small>
                    </div>
                    }

                    <div className="flex flex-row mt-3 justify-content-between">
                        <Button  label="Back" onClick={onBackClick} className="p-button-outlined p-button-danger w-5" />
                        <Button  label="Submit" onClick={onSaveClick} className="p-button-outlined p-button-success w-5" />
                    </div>
                </div>
            </div>  
            
            
        </div>
    );
}
export default AddProduct;