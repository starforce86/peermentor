var React = require('react-native');
var {
		StyleSheet,
		View,
		Text,
		Component,
		WebView
} = React;

var {bp, vw, vh} = require('react-native-relative-units')(100);
var globalStyles=require('../../common/styles/styles.js');
var styles=require('../styles.js');

class MinimoduleContent extends Component {

	render() {
		var content = this.props.content;
		if(content.content_type == 'video') {
		    return (
		        <View key={this.props.key} style={[globalStyles.margin_top_s]}>
		        	<WebView url={content.url.String} style={styles.webView} />
		        </View>
		    );
		} else {
			return (
		        <View key={this.props.key} style={[globalStyles.padding_s, globalStyles.margin_top_s]}>
			        <Text style={styles.title}>{content.title.String}</Text>
			        <Text style={styles.sub_header}>{content.sub_header.String}</Text>
			        <Text style={styles.body_text}>{content.text.String}</Text>
		        </View>
		    );
		}
  	}
}

module.exports = MinimoduleContent;