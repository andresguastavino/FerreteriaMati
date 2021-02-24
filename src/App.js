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
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async() => {
        //const headers = this.getHeaders();
        let i = 0;
        let done = false;
        let products = [];
        while(i < 1000 && !done) {
            let endpoint = 'https://api.mercadolibre.com/sites/MLA/search?nickname=FERRETERIA-TT';

            if(i > 0) {
                endpoint += '&offset=' + i;
            }

            await fetch(endpoint)
                .then(response => response.json())
                .then(data => {
                    let dataProducts = data.results;

                    if(dataProducts.length > 0) {
                        for(let dataProduct of dataProducts) {
                            products.push({
                                "id": dataProduct.id,
                                "title": dataProduct.title,
                                "price": dataProduct.price,
                                "permalink": dataProduct.permalink,
                                "thumbnail_id": dataProduct.thumbnail_id,
                                "image": ''
                            });
                        }
                    } else {
                        done = true;
                    }
                })
                .catch(error => console.log(error));
            i += 50;
        }

        for(let product of products) {
            await fetch('https://api.mercadolibre.com/pictures/' + product.thumbnail_id, 
                /*{
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Access-Control-Allow-Origin": 'https://ferreteria-tt-demo.herokuapp.com'
                    }
                }*/)
                .then(response => response.json())
                .then(data => {
                    product.image = data.variations[0].secure_url;
                })
                .catch(error => console.log(error));
        }


        this.setState((state) => {
            return {
                products: products,
                done: true
            }
        });
    }
/*
    getHeaders() {
        let origin1 = "https://ferreteria-tt-demo.herokuapp.com";
        let origin2 = "http://localhost:3000";
        const headers = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer APP_USR-2549013216826875-022316-29e292b690343e2d9dda605f35199cad-163399707",
                "Access-Control-Allow-Origin": origin1
            }
        }

        return headers;
    }
*/
    render() {
        let { products, done } = this.state;

        return(
            <div className="app">
                {done ? <Main products={products} /> : <p>Fetching data</p>}
            </div>
        );
    }
}


