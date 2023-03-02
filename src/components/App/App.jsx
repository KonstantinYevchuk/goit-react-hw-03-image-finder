import { Component } from "react";
import { Searchbar } from "components/Searchbar/Searchbar";
import { makeFetch } from "components/Api/Api";
import { Container } from "./App.styled";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";


export class App extends Component {
  state = {
    query: '',
    items: [],
    page: 1
  }
  
  loadMore = (e) => {
    console.log(e.currentTarget);
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
  }
    
  async componentDidUpdate(_, prevState) {
    if(prevState.query !== this.state.query) {
      await makeFetch(this.state.query, this.state.page)
      .then(result => {
        result.hits.map(item => {
          this.setState(prevState => (
            {
              items: [...prevState.items, item],
            }
            ))
            return item
        })
      })
      .catch(error => console.log(error)) 
      
    } else if(prevState.page !==this.state.page) {
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
    // const result = await makeFetch(data)
    // result.hits.map(item => {
    //   this.setState(prevState => (
    //     {
    //       items: [...prevState.items, item],
    //       query: data
    //     }
    //     ))
    //     return item
    // })
    
  }

  render() {
    
    return (
      <Container>
        <Searchbar onSubmit={this.addSubmitForm}/>
        <ImageGallery items={this.state.items} />
        { this.state.items.length > 0 && <Button click={this.loadMore} />}
      </Container>
    );
  }
  
};
