import { Component } from "react";
import { Searchbar } from "components/Searchbar/Searchbar";
import { makeFetch } from "components/Api/Api";
import { Container } from "./App.styled";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import toast, { Toaster } from 'react-hot-toast';
import { animateScroll as scroll } from "react-scroll";

let totalHits;


export class App extends Component {
  
  state = {
    query: '',
    items: [],
    page: 1,
    loading: false,
    error: '',
    btn: false
  }
  
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
    
      scroll.scrollToBottom(); 
 
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
              btn: true
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
        totalHits = result.totalHits
        const picsLast = totalHits - 12 * this.state.page;
        result.hits.map(item => {
          return this.setState(prevState => (
            {
              items: [...prevState.items, item],
              page: this.state.page
            }
            ))
        })
        picsLast > 0
        ? this.setState({ btn: true })
        : this.setState({ btn: false });
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
    console.log(totalHits);
    
    return (
      <Container>
        <Searchbar onSubmit={this.addSubmitForm}/>
        <ImageGallery items={this.state.items} />
        {this.state.loading && <Loader />}
        {this.state.btn && <Button click={this.loadMore} />}
        <Toaster 
        position="top-center"
        reverseOrder={false}
        />
      </Container>
    );
  }
  
};
