const orderJson = require('../orders.json');

const getOrder = (isUsd,orderJson)=>{
    const response = {
        data:[],
        total:isUsd==1 ? 100000 : 100000*35
    }

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
        
        const dataElement={
            companyName:element.customer.companyname,
            invoiceNumber:element.customer.invoice_number,
            amount:0,
            subTotal: isUsd==1 ?  (element.subtotal * element.primary_rate) : (element.subtotal * element.secondary_rate),
            totalCost: 0,
            isUsd,
            productUnit:element.products[0].product_unit
        }
       
        for (let j = 0; j < element.products.length; j++) {
            const product = element.products[j];
            dataElement.amount=dataElement.amount+product.quantity
            const costs=(product.stocklogs[0].stock_cost + product.stocklogs[0].credit_cost + product.stocklogs[0].shipment_cost);

            dataElement.totalCost=dataElement.totalCost + (costs*product.stocklogs[0].stock_quantity)
            dataElement.key=i.toString()+j.toString()
            
        }

        dataElement.totalProfit = dataElement.subTotal - dataElement.totalCost,
        dataElement.netProfit = Math.floor(Math.random() * dataElement.totalCost)
        dataElement.invoceNumber=element.invoice_number,
        response.total=response.total+dataElement.totalProfit;
        response.data.push(dataElement);
    } 


    return response;
}


const getProducts = (isUsd,orderJson)=>{
    const response = {
        data:[],
        total:isUsd==1 ? 100000 : 100000*30
    }


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

        for (let j = 0; j < element.products.length; j++) {
            const product = element.products[j];

            const costs=(product.stocklogs[0].stock_cost + product.stocklogs[0].credit_cost + product.stocklogs[0].shipment_cost);

            const dataElement={
                productName: product.product_name,
                invoceNumber:element.invoice_number,
                amount:product.quantity,
                subTotal: isUsd==1 ?  (product.total_price * element.primary_rate) : (product.total_price * element.secondary_rate),
                costs,
                totalCost: 
                    isUsd==1 
                    ? costs*  product.stocklogs[0].stock_quantity
                    : costs*  product.stocklogs[0].stock_quantity *  element.primary_rate,
                isUsd,
                productUnit:product.product_unit
            }

            dataElement.totalProfit = dataElement.subTotal - dataElement.totalCost,
            dataElement.netProfit = Math.floor(Math.random() * dataElement.totalCost)
            dataElement.key=i.toString()+j.toString()

            response.total=response.total+dataElement.totalProfit;
            response.data.push(dataElement);
        }
    }

    return response;
}


const getOrderList = async (req, res) => {
    console.log(req.body.order);
    console.log(req.body.isUsd);

    
    let response={};
    try {
        if (req.body.order==1) {
            response=getOrder(req.body.isUsd,orderJson);
        }else{
            response=getProducts(req.body.isUsd,orderJson);
        }
    } catch (error) {
        console.log(error);
    }

    res.status(200).json(response);
};

module.exports = {
    getOrderList
}