import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello World</h1>
      <input
        type="button"
        value="remove func"
        onClick={function () {
          setFuncShow(false);
        }}
      />
      <input
        type="button"
        value="remove class"
        onClick={function () {
          setClassShow(false);
        }}
      />
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

var funcStyle = "color: blue";
var funcId = 0;

function FuncComp(props) {
  var numberState = useState(props.initNumber);
  var number = numberState[0];
  var setNumber = numberState[1];

  // var dateState = useState(new  Date().toString());
  // var _date = dateState[0];
  // var setDate = dateState[1];
  // 위 3줄을 한줄로 축약한 것
  var [_date, setDate] = useState(new Date().toString());

  // side effect - React 컴포넌트가 화면에 렌더링된 이후에 비동기로 처리되어야 하는 부수적인 효과들
  useEffect(
    function () {
      // 문법의 변화가 있었나? Id 카운트가 1, 3, 4, 6 으로 한 칸씩 뛰어간다.
      console.log(
        "%cfunc => useEffect number (componentDidMout & componentDidUpdate)" +
          ++funcId,
        funcStyle
      );
      document.title = number;
      return function () {
        // clean up - 정리하는 작업을 필요로 한다면 return 값으로 함수를 준다. 만약 useEffect가 다시 실행되면 이 함수가 콜백 함수보다 먼저 실행된다.
        console.log(
          "%cfunc => useEffect number return (componentDidMout & componentDidUpdate)" +
            ++funcId,
          funcStyle
        );
      };
    },
    [number] // skipping effect - 값이 바뀔 때만 콜백함수가 호출 된다.
  );

  useEffect(function () {
    console.log("%cfunc => useEffect (componentDidMout)" + ++funcId, funcStyle);
    document.title = number;
    return function () {
      console.log(
        "%cfunc => useEffect return (componentWillUnMount)" + ++funcId,
        funcStyle
      );
    };
  }, []); // 최추 1회만 실행. 이후론 실행 X

  useEffect(
    function () {
      console.log(
        "%cfunc => useEffect date (componentDidMout & componentDidUpdate)" +
          ++funcId,
        funcStyle
      );
      document.title = number;
      return function () {
        console.log(
          "%cfunc => useEffect _date return (componentDidMout & componentDidUpdate)" +
            ++funcId,
          funcStyle
        );
      };
    },
    [_date]
  );

  console.log("%cfunc => render " + ++funcId, funcStyle);

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input
        type="button"
        value="random"
        onClick={function () {
          setNumber(Math.random());
        }}
      ></input>
      <input
        type="button"
        value="date"
        onClick={function () {
          setDate(new Date().toString());
        }}
      ></input>
    </div>
  );
}

var classStyle = "color: red";
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: new Date().toString(),
  };

  componentWillMount() {
    console.log("%cclass => componentWillMount", classStyle);
  }

  componentDidMount() {
    console.log("%cclass => componentDidMount", classStyle);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("%cclass => shouldComponentUpdate", classStyle);
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("%cclass => componentWillUpdate", classStyle);
  }

  componentDidUpdate(nextProps, nextState) {
    console.log("%cclass => componentDidUpdate", classStyle);
  }

  componentWillUnmount() {
    console.log("%cclass => componentWillUnMount", classStyle);
  }

  render() {
    console.log("%cclass => render", classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input
          type="button"
          value="random"
          onClick={function () {
            this.setState({ number: Math.random() });
          }.bind(this)}
        ></input>
        <input
          type="button"
          value="date"
          onClick={function () {
            this.setState({ date: new Date().toString() });
          }.bind(this)}
        ></input>
      </div>
    );
  }
}

export default App;
