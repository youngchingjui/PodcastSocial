import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Thumbnails from './Thumbnails'
import { PlayButton } from './Icons'

export default class ContinuePlayingCard extends Component {
    state = {}

    render() {
        console.log('Rendering ContinuePlayingCard')

        // Check if there's data in this.props.podcast yet
        // TODO: This can be written much smoother and re-factored better.
        if (!this.props.podcast) {
            image = null
        } 
        else {
            image = this.props.podcast.artworkUrl600
        }

        return (
            <View>
                <Thumbnails image={image} />
                <Text>Podcast title</Text>
                <Text>Podcast channel</Text>
                <PlayButton />
            </View>
        );
    }
}