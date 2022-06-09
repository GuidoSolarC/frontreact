import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Row, Col, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';
import './App.css';

function App() {
  // Variable para enviar a API
  const [inputValue, setInputValue] = useState()

  // Variables (estados), para contener respuesta de API
  const [msgAPI, setMSG] = useState()
  const [valorAPI, setValorAPI] = useState()
  const [primosAPI, setPrimosAPI] = useState()
  const [statusAPI, setStatus] = useState()
  // Comunicacion con API local
  const url = 'http://127.0.0.1:8000/'
  // Funcion para obtener API
  const obtenerAPI = async () => {
    const respuesta = await fetch(url + 'prueba/numerosPrimos?valor='+inputValue, {     
        method: "GET"
    })
    const plainRespuesta = await respuesta
    const responseJSON = await respuesta.json()
    // Guardo las respuestas
    setStatus(plainRespuesta.status)
    setValorAPI(responseJSON.valorRecibido)
    // setValorAPI(responseJSON.valorRecibido)
    setPrimosAPI(responseJSON.numerosPrimos)
    setMSG(responseJSON.msg)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <Col md="6">
              <Form.Label htmlFor="basic-url">Números primos</Form.Label>
              <InputGroup> 
                <FormControl
                  placeholder="Ej: 6"
                  aria-label="Parámetro"
                  aria-describedby="Input para parámetro"
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button variant="primary" id="input-parametro" onClick={ obtenerAPI }>
                  Aceptar
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row className='mt-3'>
            { statusAPI === 200 &&
              <Col md="4">
                <Alert variant="success">
                  <p>Parámetro recibido: { valorAPI }</p>
                  <p>Respuesta: { Array.isArray(primosAPI) ? primosAPI : primosAPI }</p>
                  <p>Mensaje: { msgAPI }</p>
                </Alert>
              </Col> 
            } 
          </Row>
        </Container>       
      </header>
    </div>
  );
}

export default App;
