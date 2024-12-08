import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (keyword.length > 0) {
      router.push(`/search/${keyword.trim()}`);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
