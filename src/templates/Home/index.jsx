//import logo from './logo.svg';
import './styles.css';

import React from 'react';

import {loadPosts} from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends React.Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 10,
    searchValue: ''
  };

  async componentDidMount(){
    await this.loadPosts();
  }

  loadPosts = async () => {
    
    const {page, postPerPage } = this.state;

    const postsAndPhotos =  await loadPosts()
    this.setState({ 
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);

    posts.push(...nextPosts);
    this.setState({posts, page: nextPage})

    //console.log(page, postPerPage, nextPage, nextPage + postPerPage)
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({searchValue: value});
  }

  render(){
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    }) 
    : posts;

    return (
      <section className='container'>
        <div className="search-container">
          {!!searchValue && (
            <>
              <h1> Search Value : {searchValue} </h1>
            </>
          )} 

          <TextInput 
            onChange={this.handleChange}
            value={searchValue}
        />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

      {filteredPosts.length === 0 && (
          <p>Não existem posts com esse titulo</p>
        )}
        
        
        
        <div className="button-container">
          <h1>Title</h1>
          {!searchValue &&(
                      <Button 
                      text="Load more posts" 
                      disabled={noMorePosts}
                      //Atenção esse onclick é só um atributo, nomeado igual ao evento sintético do React para fins de compreensão. Poderia ter qualquer nome
                      onClick={this.loadMorePosts}
                      />
          )}

          </div>
      </section>
    )
  }
}

export default Home;
