import { Component } from "react";
import { Searchbar } from "components/Searchbar/Searchbar";
import { makeFetch } from "components/Api/Api";
import { Container } from "./App.styled";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import toast, { Toaster } from 'react-hot-toast';



export class App extends Component {
  
  state = {
    query: '',
    items: [],
    page: 1,
    loading: false,
    error: ''
  }
  
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
   
  }
    
  async componentDidUpdate(_, prevState) {
    if(prevState.query !== this.state.query) {
      this.setState({loading: true})
      await makeFetch(this.state.query, this.state.page)
      .then(result => {
        if(result.total === 0) {
          toast.error("Not found")
        }
        result.hits.map(item => {
          this.setState(prevState => (
            {
              items: [...prevState.items, item],
            }
            ))
            return item
        })
      })
      .catch(error => {
        this.setState({
          error
        })
      })
      .finally(() => {this.setState({loading: false})}) 
      
    } else if(prevState.page !==this.state.page) {
      this.setState({loading: true})
       await makeFetch(this.state.query, this.state.page)
      .then(result => {
        result.hits.map(item => {
          this.setState(prevState => (
            {
              items: [...prevState.items, item],
              page: this.state.page
            }
            ))
            return item
        })
      })
      .catch(error => {
        this.setState({
          error
        })
      })
      .finally(() => {this.setState({loading: false})})
      
    }
  }
  addSubmitForm = async data => {
    if(data === "") {
      return
    }
    this.setState({
      query: data,
      items: [],
      page: 1
    })
    
  }
  
  render() {
    
    return (
      <Container>
        <Searchbar onSubmit={this.addSubmitForm}/>
        <ImageGallery items={this.state.items} />
        {this.state.loading && <Loader />}
        {this.state.items.length > 1 && <Button click={this.loadMore} />}
        <div className="gallery"></div>
        <Toaster 
        position="top-center"
        reverseOrder={false}
        />
      </Container>
    );
  }
  
};
