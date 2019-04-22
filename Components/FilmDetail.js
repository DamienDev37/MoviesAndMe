// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text,ActivityIndicator,ScrollView,Image,Button } from 'react-native'
import { getFilmDetailFromApi,getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'

class FilmDetail extends React.Component {
  constructor(props){
    super(props)
    this.state={
      film:undefined,
      isLoading:true
    }
  }
  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film:data,
        isLoading:false
      })

    })
  }
_displayLoading(){
  if(this.state.isLoading){
    return (
      <View style={styles.loading_container}>
      <ActivityIndicator size="large" />
      </View>
    )
  }
}
_toggleFavorite(){

}
_displayFilm() {
  const {film} = this.state
  if(this.state.film!= undefined){
    return (
      <ScrollView style={styles.scrollview_container}>
      <Image
        style={styles.image}
        source={{uri: getImageFromApi(this.state.film.backdrop_path)}}
      />
      <Text style={styles.title}>{film.title}</Text>
      <Button title="Favoris" onPress={() => this._toggleFavorite()} />
      <Text style={styles.text}>{film.overview}</Text>
      <Text style={styles.list}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
      <Text style={styles.list}>Note : {film.vote_average}</Text>
      <Text style={styles.list}>Nombre de votes : {film.vote_count}</Text>
      <Text style={styles.list}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
      <Text style={styles.list}>Genre(s) : {film.genres.map(function(genre){
        return genre.name;
      }).join(' / ')}</Text>
      <Text style={styles.list}>Compagnie(s) : {film.production_companies.map(function(company){
        return company.name;
      }).join(' / ')}</Text>
      </ScrollView>
    )
  }
}


  render() {
    console.log(this.props)
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  list: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})
const mapStateToProps = (state) => {
  return {
    favoritesFilm:state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)
