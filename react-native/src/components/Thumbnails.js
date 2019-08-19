import React, { Component } from 'react';
import { View, Image } from 'react-native';

export default class Thumbnails extends Component {
    state = {}
    render() {
        return (
            <Image src={this.props.image}></Image>

        );
    }
}