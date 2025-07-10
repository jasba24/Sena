import { Link, useNavigate } from 'react-router-dom'
import { getOneImage } from '../../utils/getImages'
import { getStorage, listAll, ref } from 'firebase/storage'
import { firebaseApp } from '../../main'

function Bolsos() {
  const navigate = useNavigate()
  let route = location.pathname.split('/')[1].split('%20').join('')
  const storage = getStorage(firebaseApp, 'gs://test-55f80.appspot.com')
  const listRef = ref(storage, `${route}`)
  const list = []
  listAll(listRef).then(res => {
    console.log(res)
    res.prefixes.map(e => {
      list.push(e._location.path)
    })
  })
  setTimeout(() => {
    const h1s = document.getElementsByTagName('h1')
    let n = 1
    while (n < h1s.length) {
      const text = `${list[n - 1].split('/')[0]} a ${list[n - 1].split('/')[1]}`
      h1s[n].textContent = text
      n += 1
    }
  }, 200)

  getOneImage(1, route)
  setTimeout(() => {
    getOneImage(0, route)
  }, 100)

  const link = document.getElementsByClassName('catalog1')
  console.log(link)

  return (
    <div id="bolsos-container">
      <h1 id="first"></h1>
      <div id="images-container" className="catalog">
        <Link id="c1" className="catalog1" to={'/Bolsos/1'}>
          Catalogo 1
        </Link>
        <Link id="c2" className="catalog2" to={'/Bolsos/2'}>
          Catalogo 2
        </Link>
      </div>
      <h1></h1>
      <div id="images-container" className="catalog">
        <a className="catalog1" onClick={() => navigate('/Bolsos/2')}>
          Catalogo 1
        </a>
        <Link className="catalog2" to={'/Bolsos/2'}>
          Catalogo 2
        </Link>
      </div>
      <h1></h1>
    </div>
  )
}

export default Bolsos
