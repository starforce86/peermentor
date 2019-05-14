/**
 * Created by Alex on 12/8/15.
 */
 'use strict';

var React = require('react-native');
var {
		StyleSheet,
} = React;
var {bp, vw, vh} = require('react-native-relative-units')(100);

var styles = StyleSheet.create({
	list_holder: {
		width: vw * 100,  
		marginTop: 20
	},
	list: {
		flexDirection: 'row', 
		alignItems: 'center',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#eaeaea'
	},
	list_icon: {
		height: 32, 
		width: 32
	},
	list_title: {
		fontSize: 16, 
		marginLeft: 20
	},
	list_arrow: {
		flex:1, textAlign: 'right', fontSize: 22, fontWeight: '500'
	},
	modal_container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 30,
    backgroundColor: '#f5fcff',
  },
  innerContainer: {
    borderRadius: 10,
    width: vw * 90,
    alignItems: 'flex-end',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 25,
    width: 40,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 24,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});

module.exports = styles;