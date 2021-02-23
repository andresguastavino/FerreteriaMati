import React, { Component } from 'react';
import Product from './../Product/Product';
import './Main.css';

export default class Main extends Component {

    constructor(props) { 
        super(props);

        this.state = {  
            products: props.products,
            visibleProducts: props.products,
        }

        this.listProducts = this.listProducts.bind(this);
        this.handleProductFilter = this.handleProductFilter.bind(this);
    }

    listProducts() {
        let products = this.state.visibleProducts;

        return products.map(
            product => (
                <Product key={product.id} product={product} />   
            )             
        );
    }

    handleProductFilter() {
        let input = document.querySelector('#productFilter');
        let value = input.value;
        let visibleProducts = [];
        if(value !== '') {
            for(let product of this.state.products) {
                if(product.title.toLowerCase().includes(value.toLowerCase())) {
                    visibleProducts.push(product);
                }
            }
        } else {
            visibleProducts = this.state.products;
        }
        this.setState({visibleProducts: visibleProducts});
    }

    render() {
        return(
            <div className="main">
                <div className="input-container">
                    <input type="text" id="productFilter" placeholder="Search" onChange={this.handleProductFilter} />
                </div>
                {this.listProducts()}
            </div>
        );
    }
}