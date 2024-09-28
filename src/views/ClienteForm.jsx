import { useEffect, useState } from 'react';
import ClientesTable from '../components/ClientesTable';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ClienteForm = () => {
  let requiredMessage = <p style={{ color: 'red' }}>* Campo obrigatório *</p>;
  let minChar = (number) => {return <p style={{ color: 'red' }}>* Minimo {number} caracteres *</p>}

  const schema = Yup.object().shape({
    nome: Yup.string().trim().min(3, minChar(3)).max(80).required(requiredMessage),
    email: Yup.string().trim().email(<p style={{ color: 'red' }}>* Informe um email válido *</p>).required(requiredMessage),
    dataNascimento: Yup.date().required(requiredMessage),
    cep: Yup.string().min(8, minChar(8)).matches(/^\d{8}$/, 'Informe apenas números').required(requiredMessage)
  });

  let [clientes, setClientes] = useState([]);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  let formData = {
    nome: '',
    email: '',
    dataNascimento: '',
    cep: ''
  };

  useEffect(() => {
    fetch('http://localhost:3000/clientes', { method: 'GET' })
      .then((res) => {
        res.json().then((data) => {
          setClientes([...data]);
        });
      })
      .catch((error) => {console.log(error);});
  }, []);

  useEffect(() => {
  }, [clientes]);

  const handleSubmit = (values) => {
    let novoCliente = { ...values };

    fetch('http://localhost:3000/clientes', {
      method: 'POST',
      body: JSON.stringify(novoCliente),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {

        setClientes([...clientes, novoCliente]);

        setShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Button className="m-2" variant="primary" onClick={handleShow}>
        +
      </Button>

      <ClientesTable clientes={clientes}></ClientesTable>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Cliente</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.nome}
                type="text"
                placeholder="Digite seu nome"
                name="nome"
              />
              <span>{formik.errors.nome}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                placeholder="Digite seu email"
                name="email"
              />
              <span>{formik.errors.email}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.dataNascimento}
                type="date"
                placeholder="Digite sua data de nascimento"
                name="dataNascimento"
              />
              <span>{formik.errors.dataNascimento}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.cep}
                type="text"
                placeholder="Digite seu CEP"
                name="cep"
                maxLength="8"
              />
              <span>{formik.errors.cep}</span>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow} type="button">
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ClienteForm;
