import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Increment, Decrement, Reset } from '../Redux/counterAction';

function Counter() {
  const dispatch = useDispatch();
  const counter = useSelector((state:any) => state.counter);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center  mb-5">Counter Application</h2>
          <h4 className="text-center">Count: {counter}</h4>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary me-2" onClick={() => dispatch(Increment())}>Increment</button>
            <button className="btn btn-secondary me-2" onClick={() => dispatch(Decrement())}>Decrement</button>
            <button className="btn btn-danger" onClick={() => dispatch(Reset())}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
