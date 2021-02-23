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
                "Access-Control-Allow-Origin": "https://ferreteria-tt-demo.herokuapp.com"
            }
        }

        let products = [];
        console.log('here');
        let data = await fetch('https://api.mercadolibre.com/sites/MLA/search?nickname=FERRETERIA-TT', headers)
            .then(response => response.json())
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
        });
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


