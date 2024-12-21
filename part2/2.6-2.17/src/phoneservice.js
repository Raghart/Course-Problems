import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getNames = () => axios.get(baseUrl)

const create = (newObject) => axios.post(baseUrl, newObject);

const deleteID = (id) => axios.delete(`${baseUrl}/${id}`)

const replaceName = (id, nameObject) => axios.put(`${baseUrl}/${id}`, nameObject)

export default { create , getNames, deleteID, replaceName};