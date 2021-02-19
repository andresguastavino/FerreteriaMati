import React, { Component } from 'react';
import './Product.css';

export default class Product extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let { product } = this.props;

        return(
            <div className="product" id={product.id}>
                <div className="title">
                    <a href={product.permalink} target="_blank" rel="noreferrer">{product.title}</a>
                </div>
                <div className="image">
                    <img src={product.image} alt="imagen producto" />
                </div>
                <div className="price">
                    <p>${product.price}</p>
                </div>
            </div>
        );
    }

}