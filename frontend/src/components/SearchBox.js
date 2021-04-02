import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword) {
            history.push(`/store/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }

    return (
        <Form onSubmit={submitHandler} inline className="searchbar__mobile">
            <Form.Control type='text' name='q' placeholder='Search...' onChange={(e) => setKeyword(e.target.value)} className='search__box'>
            </Form.Control>
            <Button type='submit' variant='outline-success' className='p-2 search__btn'><i class='fas fa-search'></i> Search</Button>
        </Form>
    )
}

export default SearchBox
