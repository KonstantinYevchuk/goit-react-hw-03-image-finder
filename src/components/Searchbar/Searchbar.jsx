import { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Input, Button, Svg } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    name: '',
  };
  handleInput = e => {
    this.setState({
        name: e.currentTarget.value.toLowerCase()
    })
  }
  handleSubmit = e => {
    const { name } = e.currentTarget.elements;
    e.preventDefault()
    if(this.state.name.trim() === '') {
        alert("Please enter word in search");
    }
    this.setState({
        name: name.value
    })
    this.props.onSubmit(this.state.name)
  }


  render() {
    return ( 
       <Header>
         <Form onSubmit={this.handleSubmit}> 
            <Button type="submit">
            <Svg />
            </Button>

            <Input 
            onChange={this.handleInput}
            className="input"
            name="name"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            />
          </Form>
        </Header>
    );
  }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}