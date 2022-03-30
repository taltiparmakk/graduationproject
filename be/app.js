const express = require("express");
const morgan = require("morgan")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const history = require("connect-history-api-fallback")
const path = require("path")
const productRouter = require("./routes/productRoutes.js");
const pool = require("./database/keys.js");
const elasticClient = require("./elasticClient/elasticSearch")


const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({useTempFiles: true}));

// Routes
app.use('/', productRouter);

// Middlewares for Vue
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Settings
const PORT = process.env.PORT || 3000

//elastic Access
elasticClient.ping({    
    requestTimeout: 3000
}, function (error) {
    if (error) {
        console.trace('Elasticsearch\'e erişilmiyor!');
    } else {
        console.log('Elasticsearch ayakta :)');
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    pool.connect(err => {
        if(err) {
            console.log('connection error', err.stack)
        } else {
            console.log('db connection successful')
        }
    })
})