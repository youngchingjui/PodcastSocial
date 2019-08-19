import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Thumbnails from './Thumbnails'
import { PlayButton } from './Icons'

export default class ContinuePlayingCard extends Component {
    state = {}

    render() {
        console.log('Rendering ContinuePlayingCard')
        return (
            <View>
                <Thumbnails image={this.props.podcast.artworkUrl600} />
                <Text>Podcast title</Text>
                <Text>Podcast channel</Text>
                <PlayButton />
            </View>
        );
    }
}