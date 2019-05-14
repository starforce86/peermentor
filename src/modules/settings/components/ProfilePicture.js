var React = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Modal
} = React;
var Camera = require('react-native-camera');
var {bp, vw, vh} = require('react-native-relative-units')(100);
var SettingsController = require('../SettingsController.js');
var globalStyles=require('../../common/styles/styles.js');

var styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: '500'
  },
  field_item: {
    width: vw * 100,
    padding: 15
  },
  label: {
    color: '#444', 
    fontSize: 16
  },
  textfield: {
    width: vw * 100, 
    height: vh * 6
  },
  button: {
    borderRadius: 5,
    height: 40,
    width: 60,
    backgroundColor: '#5CB85C',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  large_button: {
    width: 80,
    marginRight: 50
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    color: '#fff',
    textAlign: 'center',
  },
});
var ProfilePicture = React.createClass({
  getInitialState() {
    return {
      profileImage: '../../../assets/images/add_profile_image.png',
      cameraType: Camera.constants.Type.front,
      captureTarget: Camera.constants.CaptureTarget.memory,
      mode: 'camera'
    };
  },
  _takePicture() {
    var self = this;
    this.refs.cam.capture(function(err, data) {
        self.setState({
          profileImage: 'data:image/jpeg;base64,'+data,
          mode: 'preview'
        });
    });
  },
  _saveProfilePicture() {
    SettingsController.saveProfilePicture(this.state.profileImage);
  },
  render() {
    var showCameraOrPreview = {};
    var captureOrRetakeButton = {};
    if(this.state.mode == 'camera') {
      showCameraOrPreview = (<Camera
                ref="cam"
                style={{height: vh * 70, width: vw * 90}}
                type={this.state.cameraType}
                captureTarget={this.state.captureTarget}
              >
            </Camera>);
      captureOrRetakeButton = (
          <TouchableOpacity style={[styles.button, styles.large_button]} onPress={this._takePicture}>
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
        );
    } else {
      showCameraOrPreview = (<Image style={{flex:1, width: vw * 90, height: vh * 70}} source={{uri: this.state.profileImage}} />);
      captureOrRetakeButton = (
          <TouchableOpacity style={[styles.button, styles.large_button]} onPress={() => {this.setState({
              mode: 'camera'
            })}}>
            <Text style={styles.buttonText}>Re-take</Text>
          </TouchableOpacity>
        );
    }
    return (
      <View style={[styles.container, globalStyles.container]}>
        <View style={styles.field_item}>
            {showCameraOrPreview}
        </View>
        <View style={styles.row}>
          {captureOrRetakeButton}
          <TouchableOpacity style={styles.button} onPress={this._saveProfilePicture}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          </View>
      </View>
    );
  }
});

module.exports = ProfilePicture;