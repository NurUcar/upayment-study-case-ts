import { FC, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from "primereact/progressspinner";
import TopBar from '../../components/topbar';
import notify from "../../util/notify";

import { ProductActions } from '../../store/products/reducer';
import { CategoriesActions } from '../../store/categories/reducer';
import { RootState } from "../../store/rootReducer";
import CategoriesInterface from "../../services/types/categoriesInterface";
import ProductsInterface from "../../services/types/productsInterface";

const Products: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {categories, categoriesErrorMessage} = useSelector((state: RootState) => state.categories);
    const {products, productErrorMessage, productIsLoading} = useSelector((state: RootState) => state.products);
    
    const [categoryList, setCategoryList] = useState<CategoriesInterface>();    
    const [productList, setProductList] = useState<ProductsInterface>();  
    const [tempProductList, setTempProductList] = useState<ProductsInterface>();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchValue, setSearchValue] = useState('');

    
    useEffect(() =>{
        if(products === null)
            dispatch(ProductActions.getProducts());
        else{
            setProductList(products);
            setTempProductList(products);
        }
        
    },[products]);

    useEffect(() =>{
        if(categories === null)
            dispatch(CategoriesActions.getCategories());
        else
            setCategoryList(categories);       
    },[categories]);

    useEffect(() => {
        if(products){
            setProductList(products);
            setTempProductList(products);
        }
    
    });
    
    useEffect(() => {
        if (productErrorMessage) {
            notify.error(productErrorMessage);
            dispatch(ProductActions.setProductErrorMessage(""));
            dispatch(ProductActions.getProducts());
            if(products)
                setProductList(products);
        }
    }, [productErrorMessage]);

    useEffect(() => {
        if (categoriesErrorMessage) {
            notify.error(categoriesErrorMessage);
            dispatch(CategoriesActions.setCategoriesErrorMessage(""));
            dispatch(CategoriesActions.getCategories());
        }
    }, [ categoriesErrorMessage]);

   useEffect(() =>{
        if(selectedCategory && tempProductList){
            setProductList( {
                message:'', 
                products: tempProductList?.products.filter((p) => p.category === selectedCategory)
            });
        }
    },[selectedCategory]); 

    useEffect(() =>{
        if(tempProductList && searchValue)
            setProductList({
                message:'', 
                products: tempProductList?.products.filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()))
            });
        else
            setProductList(tempProductList);

    }, [searchValue]);

    const onDetailClicked = (id:any) => {   
       navigate(`product-detail/${id}`);  
    };

    const onAddProductClicked = () => {   
        navigate(`add-new-product`);  
    };

    return(
        <div>
            <TopBar/>
            {(productIsLoading) 
                ?
                    <div className="flex align-items-stretch h-screen">
                        <ProgressSpinner className="flex align-self-center"/>
                    </div>
                :
                <div className="card mt-8 text-center">
                    <div className="flex justify-content-between  align-items-center text-center flex-wrap card-container blue-container mx-8 w-10 ">
                    
                        <span className="p-input-icon-left ml-3">
                            <i className="pi pi-search" />
                            <InputText 
                                value={searchValue} 
                                onChange={(e) => setSearchValue(e.target.value)} 
                                className="w-18rem"
                                placeholder="Apple Watch, Samsung S21,.." />
                        </span>
                        <div className='flex'>
                            
                            <Button label="Add Product" className="p-button-outlined" onClick={onAddProductClicked}/>
                            <Dropdown 
                                value={selectedCategory}  
                                options={categoryList ? categoryList.categories.map((item) => {
                                    return { label: item.name, value: item.name };
                                }):[] } 
                                className="mb-1 text-left ml-3 -mr-3"
                                onChange={(e) => setSelectedCategory(e.value)} 
                                placeholder="Categories"/>
                        </div>
                        
    
                    </div>
                    <div className="flex justify-content-start align-items-center text-center flex-wrap card-container blue-container mx-8">
                    
                        {(productList) ?
                            Object.keys(productList?.products).map((id) => {
                                
                                return <div className="product-item m-3 " key={id}>
                                    <div className="product-item-content border-solid border-0 border-1 shadow-2 p-4 w-18rem h-25rem">
                                        <div className="mb-3">
                                            <img src={ productList?.products[id].avatar}  alt={"product.name"} height={200} width={200}/>
                                        </div>
                                        
                                        <div>
                                            <h4 className="mb-1 text-overflow-ellipsis white-space-nowrap overflow-hidden">{productList?.products[id].name}</h4>
                                            <p className="mt-0 mb-3">${productList?.products[id].price}</p>
                                            <div className="car-buttons mt-5">
                                                <Button icon="pi pi-search" 
                                                        className="p-button p-button-rounded mr-2" 
                                                        onClick={(e)=>onDetailClicked(productList?.products[id]._id)}/>
                                                <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded mr-2" />
                                                <Button icon="pi pi-trash" className="p-button-help p-button-rounded" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                        }) :
                        <label>No product avaible</label>
                        }  
                    </div>
                </div> 
            }
        </div>
    );
}
export default Products;