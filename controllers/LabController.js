import Controller from './Controller';
const LIMIT_FINDER = 10;
export default class LabController extends Controller {
  uribase = 'https://snpdmaroc.com/api/';
  getCadCam(limited = LIMIT_FINDER) {
    return fetch(this.uribase + 'getCad_Labs?limit=' + limited, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
  getPC_Labs(limited = LIMIT_FINDER) {
    return fetch(this.uribase + 'getPC_Labs?limit=' + limited, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
  getPA_Labs(limited = LIMIT_FINDER) {
    return fetch(this.uribase + 'getPA_Labs?limit=' + limited, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
  getOP_Labs(limited = LIMIT_FINDER) {
    return fetch(this.uribase + 'getOP_Labs?limit=' + limited, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
  getLabsCouter(city = '') {
    if (city !== '') {
      var url = this.uribase + 'labsCouter?city=' + city;
    } else {
      var url = this.uribase + 'labsCouter';
    }
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  getUserInfo(id){
    return fetch(this.uribase + 'user/' + id + '/info', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  getSearchResults(key){
    return fetch(this.uribase + 'labs/' + key + '/find', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}
