import { FC } from "react";
import { Button } from 'primereact/button';


const TopBar: FC = () => {
    
    return (
        <div className='absolute fixed z-5 shadow-2 top-0 left-0 w-full h-4rem p-1 surface-card'>

            

            <div className='flex justify-content-between '>
                <div className='flex justify-content-center w-3 lg:w-4 mt-1'>
                    <span className='mt-2 text-xl p-card-title text-500'>
                    UPayments Store
                    </span>  
                </div>
                <div className='flex justify-content-left w-2 lg:w-1 mt-2'>
                   
                </div>
                <div className='flex justify-content-center w-4 lg:w-6 mt-2'>
                    
                </div>
                <div className='flex justify-content-center w-3 lg:w-4 mt-1'>
                    <Button className='p-button-text p-card-title text-500'>
                       Register
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TopBar