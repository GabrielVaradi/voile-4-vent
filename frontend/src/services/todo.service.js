import axios from '@/lib/axios'

const index = () => axios.get('/todos').then(res => res.data)

const store = values => axios.post('/todos', values).then(res => res.data)

const update = (todoId, values) =>
    axios.put(`/todos/${todoId}`, values).then(res => res.data)

const deleteTodo = todoId => axios.delete(`todos/${todoId}`)

export default {
    index,
    store,
    update,
    deleteTodo,
}
