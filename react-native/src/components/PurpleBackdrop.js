import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import Svg, { Path, Stop, Defs, LinearGradient } from "react-native-svg";

export default class PurpleBackdrop extends Component {
    state = {}
    render() {
        return (
            <View style={styles.rectangle}>
                <Svg
                    viewBox={"-0 -0 492.6416781507329 299.4145353491142"}
                    style={styles.path}
                >
                    <Defs>
                        <LinearGradient id="gradient4" x1={0} x2={102} y1={0} y2={101}>
                            <Stop offset="0.00" stopColor="rgba(48,35,174,1)" />
                            <Stop
                                offset="1.00"
                                stopColor="rgba(200,109,215,0.3004132699275363)"
                            />
                        </LinearGradient>
                    </Defs>
                    <Path
                        strokeWidth={0}
                        fill={"url(#gradient4)"}
                        fillOpacity={0.9}
                        strokeOpacity={0.9}
                        d={
                            "M13.83 125.80 L295.13 299.41 L492.64 149.59 L492.64 0.00 L0.00 0.00 L13.83 125.80 Z"
                        }
                    />
                </Svg>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rectangle: {
        top: "6.33%",
        left: "14.20%",
        width: "76.06%",
        height: "86.33%",
        backgroundColor: "transparent",
        position: "absolute",
        overflow: "hidden"
      },
    path: {
        top: "-7.34%",
        left: "-18.67%",
        width: "131.37%",
        height: "115.60%",
        backgroundColor: "transparent",
        position: "absolute",
        borderColor: "transparent"
    },
})