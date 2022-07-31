import axios from 'axios';

async function fetchGallery(image, page) {
    const KEY = '27787422-246ac701e88e70094f4a99590'
    const url = `https://pixabay.com/api/?q=${image}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    try {
        const response = await axios.get(url);
        if (response.data.length === 0) { console.log('something goes wrong') }
        return response.data
    } catch (error) { console.log(error) }   
}
  
export default fetchGallery;