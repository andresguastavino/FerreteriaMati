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

        this.fetchProducts = this.fetchProducts.bind(this);
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        const headers = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer APP_USR-2549013216826875-022316-29e292b690343e2d9dda605f35199cad-163399707",
                "Access-Control-Allow-Origin": "http://localhost:3000"
            }
        }

        let products = [];

        let data = await fetch('https://api.mercadolibre.com/sites/MLA/search?nickname=FERRETERIA-TT', headers)
            .then(response => response.json());
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
                .then(response => response.json());
            product.image = pictureData.variations[0].url;

            products.push(product);
        }
        console.log('here 2');
        let productsTotal = data.paging.total;
        if(productsTotal > 50) {
            for(let i = 1; i < productsTotal/50 + 1; i++) {
                data = await fetch('https://api.mercadolibre.com/sites/MLA/search?nickname=FERRETERIA-TT&offset=' + i * 50, headers)
                    .then(response => response.json());

                for(let dataProduct of data.results) {
                    let product = {
                        "id": dataProduct.id,
                        "title": dataProduct.title,
                        "price": dataProduct.price,
                        "permalink": dataProduct.permalink,
                        "image": ''
                    }

                    let dataPicture = await fetch('https://api.mercadolibre.com/pictures/' + dataProduct.thumbnail_id, headers)
                        .then(response => response.json());
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
        });

            /*
            .then(
                (result) => {
                    totalProducts = result.paging.total;

                    for(let product of result.results) {
                        products.push({
                            "id": product.id,
                            "title": product.title,
                            "price": product.price,
                            "permalink": product.permalink,
                            "thumbnail_id": product.thumbnail_id,
                            "image": ''
                        });
                    }
                },
                (error) => {
                    console.log(error);
                });
/*
        if(totalProducts > 50) {
            for(let i = 1; i < totalProducts/50 + 1; i++) {
                fetchProducts = await fetch('https://api.mercadolibre.com/sites/MLA/search?nickname=FERRETERIA-TT&offset=' + i * 50)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            for(let product of result.results) {
                                products.push({
                                    "id": product.id,
                                    "title": product.title,
                                    "price": product.price,
                                    "permalink": product.permalink,
                                    "thumbnail_id": product.thumbnail_id,
                                    "image": ''
                                });
                            }
                        },
                        (error) => {
                            console.log(error);
                        });
            }
        }

        for(let product of products) {
            fetch('https://api.mercadolibre.com/pictures/' + product.thumbnail_id)
            .then(res => res.json())
            .then(
                (result) => {
                    product.image = result.variations[0].url;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        /*
        await fetch('https://api.mercadolibre.com/sites/MLA/search?nickname=FERRETERIA-TT')
        .then(res => res.json())
        .then(
            (result) => {
                let products = [];
                for(let product of result.results) {
                    products.push({
                        "id": product.id,
                        "title": product.title,
                        "price": product.price,
                        "permalink": product.permalink,
                        "thumbnail_id": product.thumbnail_id,
                        "image": ''
                    });
                }
                
                let totalProducts = result.paging.total;
                if(totalProducts > 50) {
                    for(let i = 1; i < totalProducts/50 + 1; i++) {
                        fetch('https://api.mercadolibre.com/sites/MLA/search?nickname=FERRETERIA-TT&offset=' + i * 50)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                for(let product of result.results) {
                                    products.push({
                                        "id": product.id,
                                        "title": product.title,
                                        "price": product.price,
                                        "permalink": product.permalink,
                                        "thumbnail_id": product.thumbnail_id,
                                        "image": ''
                                    });
                                }
                                this.setState({products: products});
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                    }
                }
            },
            (error) => {
                console.log(error);
            }
        );*/
    }

    fetchImages() {
        let products = this.state.products;
        for(let product of products) {
            fetch('https://api.mercadolibre.com/pictures/' + product.thumbnail_id)
            .then(res => res.json())
            .then(
                (result) => {
                    product.image = result.variations[0].url;
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        this.setState({products: products});
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


