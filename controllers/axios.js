import axios from "axios";
const controller = {};

export const getAll = async (req, res) => {
    // metode ke 1-2
    //    axios ({
    //        method: 'get',
    //        url: 'http://localhost:3000/product'
    //    })
    ////    axios.get('http://localhost:3000/product')
    //        .then(function (response) {
    //            res.status(200).json({
    //                message: 'Data API',
    //                data: response.data
    //            })
    //        })
    //        .catch(function (error) {
    //            res.status(404).json({
    //                message: error.message
    //            })
    //        })

    //metode ke 3
    try {
        const response = await axios.get('http://localhost:3000/product');
        console.log(response.data);
        if (response.data.length > 0) {
            res.status(200).json({
                message: 'Data dari API',
                data: response.data
            })
        } else {
            res.status(200).json({
                message: 'Data tidak ada',
                data: []
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }

}
