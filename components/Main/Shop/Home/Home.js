import React, { PureComponent } from 'react';
import { Text, ScrollView,View } from 'react-native';
import Collection from './Collection'
import Category from './Category'
import TopProduct from './TopProduct'
export default class Home extends PureComponent {
  render() {
      
    const {categoryTypes} = this.props
        const {topProducts} = this.props
        return (
            <ScrollView style={{flex:1, backgroundColor: '#e0e0e0'}}>
                <Collection navigation= {this.props.navigation}/>
                <Category navigation = {this.props.navigation} categoryTypes={categoryTypes}/>
                <TopProduct navigation = {this.props.navigation} topProducts={topProducts}/>
            </ScrollView>
        )
    }
}
