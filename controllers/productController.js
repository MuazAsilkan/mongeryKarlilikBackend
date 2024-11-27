const orderJson = require('../orders.json');

const getProductList = async (req, res) => {
    try {
        for (let i = 0; i < orderJson.orders.length; i++) {
            const element = orderJson.orders[i];            
            
            if (typeof element.customer=="string") {
                const _customer= JSON.parse(element.customer);
                element.customer=_customer;
            }
            
            if (typeof element.products=="string") {
                const _products = JSON.parse(element.products);
                element.products=_products; 
            }
        }
        res.status(200).json(orderJson);
    } catch (error) {
        console.log(error);
    }

    
};

module.exports = {
    getProductList
}