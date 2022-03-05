import './App.css';
import {useEffect, useState} from "react";
import {onSnapshot, collection} from '@firebase/firestore'
import {db} from "./firebase";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import kitsune from './source/resources/kitsune.jpg'
import tempest from './source/resources/tempest.jpg'
import vedmak from './source/resources/vedmak.jpg'

const getImage = (name) => {
  switch (name){
    case 'Kitsune':
      return kitsune
    case 'Vedmak':
      return vedmak
    case 'Tempest':
      return tempest
    default:
      return ''
  }
}

const App = () => {
  const [data, setData] = useState([]);
  const [selectedShipData, setSelectedShipData] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    onSnapshot(collection(db, 'AvailableShips'), (snapshot) => {

      const mappedData = snapshot.docs.map((doc) => ({
        shipParameters: doc.data(), name: doc.id
      }))
      console.log("snapshot => ", mappedData);

      setData(mappedData)
    });
  }, []);

  
  console.log("data => ", data);
  console.log("selectedShipData => ", selectedShipData);

  return (
      <>
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Snib's Wormhole Store</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link active" id="storefront-btn">Storefront</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="items-on-sale-btn">Items On Sale</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="how-it-works-btn">How it works</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <section id="content">
          {
            data.map((shipData) => <div key={shipData.name} className="entry" onClick={() => {
              setSelectedShipData(shipData)
              setShowModal(true)
            }}>
              <img src={getImage(shipData.name)} alt={shipData.name}/>
            </div>)
          }
        </section>


        <Modal show={showModal} centered onHide={() => setShowModal(false)}>
          <Modal.Header closeButton onClick={() => setShowModal(false)}>
            <Modal.Title>Ship details</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>{selectedShipData && selectedShipData.shipParameters.Price}</div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              setShowModal(false);
              setSelectedShipData(undefined);
            }}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
  );
}

export default App;
