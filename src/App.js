import React, { Component } from 'react';
import Main from './components/Main/Main';
import './App.css';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
        }

        this.fetchProducts = this.fetchProducts.bind(this);
        this.fetchImages = this.fetchImages.bind(this);
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        const headers = {
            method: "GET",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "authorization": "Bearer APP_USR-2549013216826875-022303-746af60233a006a89dfb677e586a6cb9-163399707"
            },
            mode: "cors",
            cache: "default"
        }

        let products = [];

        let fetchProducts = await fetch('https://api.mercadolibre.com/sites/MLA/search?nickname=FERRETERIA-TT', headers)
            .then(res => res.json());

        for(let fetchProduct of fetchProducts.results) {
            let product = {
                "id": fetchProduct.id,
                "title": fetchProduct.title,
                "price": fetchProduct.price,
                "permalink": fetchProduct.permalink,
                "image": ''
            }

            let fetchPicture = await fetch('https://api.mercadolibre.com/pictures/' + fetchProduct.thumbnail_id, headers)
                .then(res => res.json());
            product.image = fetchPicture.variations[0].url;
            
            products.push(product);
        }

        let productsTotal = fetchProducts.paging.total;
        if(productsTotal > 50) {
            for(let i = 1; i < productsTotal/50 + 1; i++) {
                fetchProducts = await fetch('https://api.mercadolibre.com/sites/MLA/search?nickname=FERRETERIA-TT&offset=' + i * 50, headers)
                    .then(res => res.json());

                for(let fetchProduct of fetchProducts.results) {
                    let product = {
                        "id": fetchProduct.id,
                        "title": fetchProduct.title,
                        "price": fetchProduct.price,
                        "permalink": fetchProduct.permalink,
                        "image": ''
                    }

                    let fetchPicture = await fetch('https://api.mercadolibre.com/pictures/' + fetchProduct.thumbnail_id, headers)
                        .then(res => res.json());
                    product.image = fetchPicture.variations[0].url;
                    
                    products.push(product);
                }

                this.setState({products: products});
            }
        }

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
        let { products } = this.state;

        return(
            <div className="app">
                <Main products={products} />
            </div>
        );
    }
}


