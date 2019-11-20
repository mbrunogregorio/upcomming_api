import TmdbService from '../services/TmdbService';

class MovieController {
  /**
   * Method list Movies
   */
  async index(req, res) {
    const page = req.query.page ? req.query.page : null;
    const filter = req.query.filter ? req.query.filter : null;

    const list = await TmdbService.getList(page, filter);

    res.json(list);
  }

  async show(req, res) {
    const { id } = req.params;
    const movie = await TmdbService.getMovie(id);
    res.json(movie);
  }
}

export default new MovieController();
