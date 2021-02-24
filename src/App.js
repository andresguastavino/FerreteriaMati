import React, { Component } from 'react';
import Main from './components/Main/Main';
import './App.css';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            done: false,
        }

        this.fetchData = this.fetchData.bind(this);
        this.fetchDataProducts = this.fetchDataProducts.bind(this);
        this.fetchDataPicture = this.fetchDataPicture.bind(this);
        this.getHeaders = this.getHeaders.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.fetchDataProducts();
/*
        fetch('https://api.mercadolibre.com/sites/MLA/search?nickname=FERRETERIA-TT', headers)
            .then(response => response.json())
            .then(data => {
                let products = [];
                
                for(let productData of data.results) {
                    let product = {
                        "id": productData.id,
                        "title": productData.title,
                        "price": productData.price,
                        "permalink": productData.permalink,
                        "image": ''
                    }
                }
            })
            .catch(error => console.log(error));
        console.log('here 1');
        for(let productData of data.results) {
            let product = {
                "id": productData.id,
                "title": productData.title,
                "price": productData.price,
                "permalink": productData.permalink,
                "image": ''
            }

            let pictureData = await fetch('https://api.mercadolibre.com/pictures/' + productData.thumbnail_id, headers)
                .then(response => response.json())
                .catch(error => console.log(error));
            console.log(pictureData);
            product.image = pictureData.variations[0].url;

            products.push(product);
        }
        console.log('here 2');
        let productsTotal = data.paging.total;
        if(productsTotal > 50) {
            for(let i = 1; i < productsTotal/50 + 1; i++) {
                data = await fetch('https://api.mercadolibre.com/sites/MLA/search?nickname=FERRETERIA-TT&offset=' + i * 50, headers)
                    .then(response => response.json())
                    .catch(error => console.log(error));

                for(let dataProduct of data.results) {
                    let product = {
                        "id": dataProduct.id,
                        "title": dataProduct.title,
                        "price": dataProduct.price,
                        "permalink": dataProduct.permalink,
                        "image": ''
                    }

                    let dataPicture = await fetch('https://api.mercadolibre.com/pictures/' + dataProduct.thumbnail_id, headers)
                        .then(response => response.json())
                        .catch(error => console.log(error));
                    product.image = dataPicture.variations[0].url;

                    products.push(product);
                }
            }
        }
        console.log('here 3');
        this.setState((state) => {
            return {
                products: products,
                done: true
            }
        });*/
    }

    fetchDataProducts = async() => {
        const headers = this.getHeaders();

        let i = 0;
        while(i < 1000 && !this.state.done) {
            let endpoint = 'https://api.mercadolibre.com/sites/MLA/search?nickname=FERRETERIA-TT';

            if(i > 0) {
                endpoint += '&offset=' + i;
            }

            await fetch(endpoint/*, headers*/)
            .then(response => response.json())
            .then(data => {
                let products = this.state.products;
                let dataProducts = data.results;

                if(dataProducts.length > 0) {
                    for(let productData of dataProducts) {
                        let product = {
                            "id": productData.id,
                            "title": productData.title,
                            "price": productData.price,
                            "permalink": productData.permalink,
                            "thumbnail_id": productData.thumbnail_id,
                            "image": ''
                        }

                        fetch('https://api.mercadolibre.com/pictures/' + product.thumbnail_id/*, headers*/)
                        .then(response => response.json())
                        .then(data => {
                            product.image = data.variations[0].secure_url;
                        })
                        .catch(error => console.log(error));

                        products.push(product);
                    }

                    this.setState({products: products});
                } else {
                    this.setState({done: true});
                }
            })
            .catch(error => console.log(error));

            i += 50;
        }
        
    }

    fetchDataPicture(product) {
        const headers = this.getHeaders();

        let image;


            
        return image;
    }

    getHeaders() {
        let origin1 = "https://ferreteria-tt-demo.herokuapp.com";
        let origin2 = "http://localhost:3000";
        const headers = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer APP_USR-2549013216826875-022316-29e292b690343e2d9dda605f35199cad-163399707",
                "Access-Control-Allow-Origin": origin2
            }
        }

        return headers;
    }

    render() {
        let { products, done } = this.state;

        return(
            <div className="app">
                {done ? <Main products={products} /> : <p>Fetching data</p>}
            </div>
        );
    }
}


