const orders = require("../db/models/orders-model")

const addOrder = async ({ id, orderNo, orderAddress, orderNetAmount, orderCashback, orderDate }) => {
    try {
        let newOrder = await orders.create({
            _userId: id,
            _orderNo: orderNo,
            _orderAddress: orderAddress,
            _orderNetAmount: orderNetAmount,
            _orderCashback: orderCashback,
            _orderDate: orderDate
        })

        if (newOrder) {
            return {
                newOrder
            }
        } else {
            return {
                orderErr: 'Referral registration thread failed...'
            }
        }
    } catch (orderErr) {
        return {
            orderErr: 'Referral registration thread denied...'
        }
    }
}

const getOrder = async ({ id }) => {
    try {
        let order = await orders.findById(id)

        if (order) {
            return {
                order
            }
        } else {
            return {
                orderErr: 'Code fetching thread failed...'
            }
        }
    } catch (orderErr) {
        return {
            orderErr: 'Code fetching thread denied...'
        }
    }
}

const getOrders = async () => {
    try {
        let ordersArray = await orders.find({})

        if (ordersArray) {
            return {
                ordersArray
            }
        } else {
            return {
                orderErr: 'Order fetching thread failed...'
            }
        }
    } catch (orderErr) {
        return {
            orderErr: 'Order fetching thread denied...'
        }
    }
}

const updateOrder = async ({ id, orderUpdates }) => {
    try {
        let order = await orders.findByIdAndUpdate(id, orderUpdates);
        const updatedOrder = await orders.findById(id)

        if (updatedOrder) {
            return {
                updatedOrder
            }
        } else {
            return {
                orderErrr: 'Order updation thread failed...'
            }
        }
    } catch (orderErr) {
        return {
            orderErrr: 'Order updation thread denied...'
        }
    }
}

const deleteOrder = async ({ id }) => {
    try {
        let deletedOrder = await orders.findByIdAndDelete(id);

        if (deletedOrder) {
            return {
                deletedOrder
            }
        } else {
            return {
                orderErr: 'Order deletion thread failed...'
            }
        }
    } catch (orderErr) {
        return {
            orderErr: 'Order deletion thread denied...'
        }
    }
}

module.exports = {
    addOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getOrders
}
