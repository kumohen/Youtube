import _ from 'lodash';
import React, { Component } from 'react';
import SearchBar from './Components/search_bar';
import VideoList from './Components/video_list';
import VideoDetail from './Components/video_details';
import Youtube from './Components/header';
import './style/style.css';
import YTSearch from 'youtube-api-search';

const API_KEY = 'YOUR_API_KEY';





class App extends Component{
   constructor(props){
        super(props);
        this.state = {videos : [],
          selectedVideo:null
        }

        this.videoSearch('surfboards');

    }


    videoSearch(term){
      YTSearch({key:API_KEY ,term:term},(videos)=>{
                this.setState({videos:videos,
                  selectedVideo:videos[0]
                })
        });
    }

  render(){
    const videoSearch = _.debounce((term)=> {this.videoSearch(term)},300);
    return (
      <div>
        <Youtube />
        <SearchBar
        onSearchTermChange = {videoSearch}
        />
        <VideoDetail video={this.state.selectedVideo}  />
        <VideoList
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos}/>
      </div>
      )
  }
}

export default App;
