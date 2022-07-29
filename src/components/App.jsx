import { Component } from 'react';
import fetchGallery from 'helpers/fetchGallery';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    searchImages: '',
    gallery: [],
    page: 1,
    status: 'idle',
    isModalOpen: false,
    modalImg: {}
  }

  handleSubmit = ( {searchImages}, {resetForm} ) => {

    this.setState({ searchImages });
    this.setState({ gallery: [], page: 1 });
    resetForm();
  }
  
  async componentDidUpdate(_, prevState) {
    const { searchImages, page} = this.state;
    if (prevState.searchImages !== searchImages || prevState.page !== page) {
      this.setState({ status: 'pending' });
      const response = await fetchGallery(searchImages, page); 
      this.setState({ status: 'resolved' });
      this.setState(prevState => ({ gallery: [...prevState.gallery, ...response] }));
      if (this.state.gallery.length === 0) { <div>Ooooops! I can not find this</div> };
    }
  }

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  getModalImage = (id) => {
    const galleryItem = this.state.gallery.find(item => item.id === id);
    this.setState({ modalImg: { largeImgUrl: galleryItem.largeImageURL, tag: galleryItem.tags }, isModalOpen: true });
  }

  closeModal= () => {
     this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <>
          <Searchbar onSubmit={this.handleSubmit} />
          {this.state.status === "pending" && <Loader />}
          {this.state.status === "resolved" && <ImageGallery imageGallery={this.state.gallery} openModal={this.getModalImage} />}
          {this.state.gallery.length > 0 && <Button onClick={this.handleClick} />}
          {this.state.isModalOpen && <Modal largeImgUrl={this.state.modalImg.largeImgUrl} tag={this.state.modalImg.tag} closeModal={this.closeModal} /> }           
      </>
      )
  }
}
