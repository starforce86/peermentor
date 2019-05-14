/**
 * Created by Alex on 12/8/15.
 */
var React = require('react-native');
var {Router, Route, Schema, Animations, TabBar} = require('react-native-router-flux');
var { StyleSheet, View, Image, Text, TextInput, Navigator, TouchableOpacity } = React;

// Pages
var LoadingPage = require('./modules/loading/LoadingPage');

var WelcomePage = require('./modules/welcome/WelcomePage');
var ManualPage = require('./modules/welcome/manual/ManualPage');
var LoginPage = require('./modules/login/LoginPage');
var MainPage = require('./modules/main/MainPage');
                // <Route name="main" component={MainPage} initial={true} title="Main" schema="withoutAnimation" /> 
// <MainPage/>
export default class peermentor extends React.Component {
    
    _renderScene(route, nav) {
        switch (route.id) {
          case 'welcome':
            return <WelcomePage navigator={nav} />;
          case 'login':
            return <LoginPage navigator={nav} />;
          case 'manual':
            return <ManualPage navigator={nav} />;
          case 'main':
            return <MainPage navigator={nav} />;
          default:
            return (
              <View />
            );
        }
    }

    _setNavigatorRef(navigator) {
        if (navigator !== this._navigator) {
            this._navigator = navigator;
        }
    }

    render() {
        return (
            <Navigator
                ref={this._setNavigatorRef}
                style={{flex: 1,}}
                initialRoute={{ id: 'welcome'}}
                renderScene={this._renderScene}
                configureScene={(route) => {
                  if (route.sceneConfig) {
                    return route.sceneConfig;
                  }
                  return Navigator.SceneConfigs.FloatFromBottom;
                }}
            />
        );
    }

}