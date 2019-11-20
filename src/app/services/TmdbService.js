/* eslint-disable camelcase */
import Axios from 'axios';
import config from '../../config/tmdb';

class TmdbService {
  async getList(page = 1, filter = null) {
    try {
      /**
       * If filter is given, access search movies endpoint
       */
      const url = filter
        ? `/search/movie/?api_key=${config.api_key}&page=${page}&query=${filter}`
        : `/movie/upcoming/?api_key=${config.api_key}&page=${page}`;
      const ret = await Axios.get(`${config.base_url}${url}`);
      const list = ret.data.results;

      const genre_list = await this.getGenreList();

      const clean_list = list.map(item => {
        const {
          id,
          title,
          poster_path,
          backdrop_path,
          genre_ids,
          release_date,
        } = item;

        const genre_names = genre_ids.map(genre_id => {
          return genre_list.find(genre_item => genre_item.id === genre_id).name;
        });

        const poster_path_url = this.constructor.buildImageURL(poster_path);
        const backdrop_path_url = this.constructor.buildImageURL(backdrop_path);

        const newItem = {
          id,
          title,
          poster_path_url,
          backdrop_path_url,
          release_date,
          genre_names,
        };

        return newItem;
      });

      return {
        movies: clean_list,
        page: ret.data.page,
        total_pages: ret.data.total_pages,
      };
    } catch (error) {
      return { error: 'Data fetch error' };
    }
  }

  async getMovie(id = null) {
    try {
      const movie_data = await Axios.get(
        `${config.base_url}/movie/${id}?api_key=${config.api_key}`
      );

      const {
        title,
        poster_path,
        backdrop_path,
        genres,
        overview,
        release_date,
      } = movie_data.data;

      const poster_path_url = this.constructor.buildImageURL(poster_path);
      const backdrop_path_url = this.constructor.buildImageURL(backdrop_path);

      return {
        title,
        poster_path_url,
        backdrop_path_url,
        genres,
        overview,
        release_date,
      };
    } catch (error) {
      return { error: 'Data fetch error' };
    }
  }

  async getGenreList() {
    try {
      const ret = await Axios.get(
        `${config.base_url}/genre/movie/list?api_key=${config.api_key}`
      );
      return ret.data.genres;
    } catch (error) {
      return { error: 'Data fetch error' };
    }
  }

  static buildImageURL(path) {
    return path ? `${config.img_base_url}${path}` : path;
  }
}

export default new TmdbService();
