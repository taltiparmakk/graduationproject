const { Pool } = require("pg");
const pool = require("../database/keys")
const cloudinary = require("../lib/cloudinary")
const logger = require("../logger/Products")
const elasticClient = require("../elasticClient/elasticSearch")


const product = {};

// COURSES

//CREATE
// p_name 
// p_category
// p_description 
// p_price
//p_url
// product.createItems = async (req, res) => {
   
//     const { p_name, p_category, p_description, p_price} = req.body;
//          try {
//         await pool.query('INSERT INTO products (p_name, p_category, p_description, p_price, p_image) VALUES ($1, $2, $3, $4, $5) RETURNING*', [ p_name, p_category, p_description, p_price, p_image]);
//         const products = await pool.query('SELECT * FROM product ORDER BY id DESC LIMIT 1').rows[0];
//         res.status(200).json({
//             message: 'Successful added products',
//             products
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'An error has ocurred',
//             error
//         })
//     }
// };
product.createItems = async (req, res) => {
   
    try {
        const text = "INSERT INTO products (p_name, p_category, p_description, p_price, p_url) VALUES ($1, $2, $3, $4, $5 ) RETURNING *"
        
        const values = [req.body.p_name, req.body.p_category, req.body.p_description, req.body.p_price, req.body.p_url]

        const { rows} = await pool.query(text, values)
        logger.log({
            level : "info",
            message : res
        });
        return res.status(201).json({ createdUser: rows[0]})
       
    } catch (error) {
        console.log('error occured', error.message)
        return res.status(400).json({message: error.message})
    }
};

//READ

product.readItems = async (req, res) => {
    const id = req.params.id;
    try {
        const products = await pool.query('SELECT * FROM products WHERE id=$1', [id]).rows;
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
    }
}

//UPDATE
// product.updateItems = async (req, res)=>{
//     const id = req.params.id;
//     const {p_name, p_category} = req.body;
//     try {
//         await pool.query('UPDATE products SET p_name=$1, p_category=$2 WHERE id_c=$3', [p_name, p_category, id]);
//         res.status(200).json({
//             message: 'Successful edited course',
//             products: {p_name, p_category}
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'An error has ocurred',
//             error
//         })
//     }
// }
product.updateItems = async (req, res)=>{
    const id = req.params.id;
    const {p_name, p_category} = req.body;
    try {
        await pool.query('UPDATE products SET p_name=$1, p_category=$2 WHERE id=$3', [p_name, p_category, id]);
        res.status(200).json({
            message: 'Successful edited course',
            products: {p_name, p_category}
        })
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
    }
}

//DELETE
// product.deleteItems = async (req, res) => {
//     const id = req.params.id;
//     try {
//         await pool.query('DELETE FROM products WHERE id=$1', [id]);
//         res.status(200).json({
//             message: 'Successful deleted item'
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'An error has ocurred',
//             error
//         })
//     }
// }
product.deleteItems = async (req, res) => {
    try {
        const { id } = req.params

        const text = "DELETE FROM products WHERE id = $1 RETURNING *"

        const values = [id]

        const { rows } = await pool.query(text, values)
        
        return res.status(200).json({ deletedUser: rows[0] })
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    }
}
//ALL
// product.getItems = async (req, res) => {
//     const {id} = req.body;
//     try {
//         const courses = await (await pool.query('SELECT * FROM products WHERE p_id=$1', [id])).rows;
//         res.status(200).json(courses);
//     } catch (error) {
//         res.status(500).json({
//             message: 'An error has ocurred',
//             error
//         })
//     }
// }
product.getItems = async (req, res) => {
    try {
        const text = "SELECT * FROM products ORDER BY id ASC"

        const { rows } = await pool.query(text)

        return res.status(200).json(rows)
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })   
    }
}

// ELASTIC CONTROLLER
//GET
getProductElastic = (req, res) => {
    console.log(req.query.name);
    elasticClient.search({
        index: "products",
        body: {
            query: {
                match_phrase_prefix: {
                    "name": req.query?.name
                }
            }
        }
    
},(err, rest) => {
    if (err) {
        console.log(err);
    }
    else {
        return res.status(200).json(rest.hits.hits[0]._source);
    }
})
}


//POST
postProductElastic = (req,res) => {
    let data = {};
    pool.query("SELECT * FROM products", (err, result) => {
        if (err) return res.status(500).json({ error: "hata"});
        data = result.rows;

        elasticClient.index({
            index: "products",
            type: "customtype",
            body: data[0]
        }, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                return res.status(200).json(data);
            }
        });
        });
    }

    InsertElastic = (data) => {
        elasticClient.index({
            index: "products",
            type : "customtype",
            body : data
        }, (err) => {
            if (err) {
            return false;
        }
        
        else {
            return true;
        }
      });
    }

//READ
//UPDATE
//DELETE

module.exports = {
    product,
    InsertElastic,
    getProductElastic,
    postProductElastic
}
