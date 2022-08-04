const constraints = {
    name:{
        presence: {
            message: 'Product name can not be empty.'
        }
    },
    description:{
        presence: {
            message: 'Description can not be empty.'
        }
    },
    imageUrl:{
        presence: {
            message: 'Image URL can not be empty.'
        },
        url: true
        
    },
    category:{
        presence: {
            message: 'Category can not be empty.'
        }
    },
    price:{
        presence: {
            message: 'Price can not be empty.'
        }
    },

}

export default constraints

