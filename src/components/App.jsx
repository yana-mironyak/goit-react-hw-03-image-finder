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
    modalImg: {},
    totalHits: ''
  }

  handleSubmit = ({ searchImages }) => {
    if (searchImages === this.state.searchImages) {
      return;
    }
    this.setState({ searchImages });
    this.setState({ gallery: [], page: 1 });
  }
  
  async componentDidUpdate(_, prevState) {
    const { searchImages, page} = this.state;
    if (prevState.searchImages !== searchImages || prevState.page !== page) {
      this.setState({ status: 'pending' });
      const response = await fetchGallery(searchImages, page); 
      this.setState(prevState => ({ gallery: [...prevState.gallery, ...response.hits], status: 'resolved', totalHits: response.totalHits }));
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
    const { status, gallery, isModalOpen, modalImg, totalHits } = this.state;
    return (
      <>
          <Searchbar onSubmit={this.handleSubmit} />
          {status === "pending" && <Loader />}
          {(status === "resolved" || gallery.length > 0) && <ImageGallery imageGallery={gallery} openModal={this.getModalImage} />}
          {(gallery.length > 0 && gallery.length < totalHits) && <Button onClick={this.handleClick} />}
          {isModalOpen && <Modal largeImgUrl={modalImg.largeImgUrl} tag={modalImg.tag} closeModal={this.closeModal} /> }           
      </>
      )
  }
}
