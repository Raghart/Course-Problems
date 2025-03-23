import axios from 'axios';

const baseUrl = '/api/persons';

const getNames = async () => axios.get(baseUrl).catch(error => console.log('Error fetching names:', error));

const create = (newObject) => axios.post(baseUrl, newObject);

const deleteID = (id) => axios.delete(`${baseUrl}/${id}`);

const replaceName = (id, nameObject) => axios.put(`${baseUrl}/${id}`, nameObject);

export default { create , getNames, deleteID, replaceName};