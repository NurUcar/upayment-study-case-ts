import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import { Image } from 'primereact/image';
import { Divider } from 'primereact/divider';
import { ProgressSpinner } from "primereact/progressspinner";

import TopBar from '../../components/topbar';
import notify from "../../util/notify";

import { ProductActions } from '../../store/products/reducer';
import ProductInterface from "../../services/types/productInterface";
import { RootState } from "../../store/rootReducer";

const ProductDetail: FC = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const {product, productErrorMessage, productIsLoading} = useSelector((state: RootState) => state.products);

    const [initialState, setInitialState] = useState<ProductInterface>(
                {
                    message:'', 
                    product:
                        {
                            name:'',
                            avatar:'',
                            category:'',
                            description:'',
                            developerEmail:'',
                            price:0
                        }
                }); 

    const [productDetail, setProductDetail] = useState<ProductInterface>(initialState);
    
    useEffect(() =>{
        setProductDetail(initialState)
        dispatch(ProductActions.getProduct(String(params.id)));
    },[params.id]);

    useEffect(() =>{
        if(product)
            setProductDetail(product)
    }, [product])

    useEffect(() => {
        if (productErrorMessage) {
            notify.error(productErrorMessage);
            dispatch(ProductActions.setProductErrorMessage(""));
            dispatch(ProductActions.getProduct(String(params.id)));  
        };
    }, [productErrorMessage]); 

    return(
        <div className="card">
            <TopBar/>
            {(productIsLoading) 
                ?
                    <div className="flex align-items-stretch h-screen">
                        <ProgressSpinner className="flex align-self-center"/>
                    </div>
                :

                    <div className="flex flex-column justify-content-center flex-wrap card-container w-7 p-3 mt-8 ml-auto mr-auto shadow-2 "> 
                        <div className='flex flex-row  justify-content-start flex-wrap  '>
                        <div className=" flex justify-content-start align-self-center">  
                                <Image src={productDetail?.product.avatar} alt="Image" width="300" preview className='mr-5'/>
                            </div>
                            <div className="flex flex-column align-content-between w-5 "> 
                                <label className='text-4xl font-bold text mb-4 '>{productDetail?.product.name}</label>
                                <label className='text-3xl mt-auto'>${productDetail?.product.price}</label>
                            </div>
                            <Divider className="bold"/>
                        </div>
                        <div className='flex flex-column'>
                            <h2>Description</h2>
                            <p className="surface-overlay m-0">{productDetail?.product.description}</p>
                        </div>
                    </div> 
            }
        </div>
    );
}
export default ProductDetail;