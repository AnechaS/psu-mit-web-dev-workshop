/**
 * 1. State
 * 2. Props
 * 3. Handling events
 * 4. Lifecycle
 * 5. Form @see https://reactjs.org/docs/forms.html
 */

import React, { Component } from "react";

/**
 * Hooks
 * เป็น Component ที่เขียนอยู่ในรูปแบบ functions.
 * @see https://reactjs.org/docs/hooks-intro.html
 * ----------------------------------------------------------
 *
 * Props
 * props ย่อมาจาก properties ใช้เพื่อรับข้อมูลจากภายนอก
 * @see https://reactjs.org/docs/components-and-props.html
 */
function PersonComponent(props) {
  return (
    <div style={{ marginTop: 15 }}>
      {/* เรียกใช้งานข้อมูลที่อยู่ใน Props */}
      <div>Name: {props.name}</div>
      <div>power: {props.power}</div>
    </div>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);

    /**
     * State
     * ข้อมูลที่เก็บอยู่ใน State เมื่อมีการเปลี่ยนแปลงค่า Component จะ Render ใหม่อัตโนมัต เพื่อให้ข้อมูลเป็นปัจจุบัน (Realtime)
     * @see https://reactjs.org/docs/state-and-lifecycle.html
     */
    this.state = {
      message: "Hello.",
      text: "",
      isTrue: false,
    };

    // ถ้าหาก method ไม่ได้เป็น Arrow จำเป็นต้อง [methodName].bind(this) เพื่อให้มองเห็น object
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handleMessageChange() {
    this.setState({ message: "hi" });
  }

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  };

  /**
   * Component Lifecycle
   * @see https://reactjs.org/docs/state-and-lifecycle.html
   */
  /**
   * componentDidMount
   * ทำงานเมื่อเริ่มต้น
   * @see https://reactjs.org/docs/react-component.html#componentdidmount
   */
  componentDidMount() {
    console.log("didMount");
  }

  /**
   * componentDidUpdate
   * ทำงานเมื่อ State หรือ Props มีการ
   * @https://reactjs.org/docs/react-component.html#componentdidupdate
   *
   * @param {object} prevProps ข้อมูลเก่าใน Props
   * @param {object} prevState ข้อมูลเก่าใน State
   */
  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate", prevProps, prevState);
  }

  /**
   * componentWillUnmount
   * ทำงานเมื่อ Component โดนลบออก
   * @see https://reactjs.org/docs/react-component.html#componentwillunmount
   */
  componentWillUnmount() {}

  render() {
    return (
      <div>
        <div>
          <h2>ตัวอย่าง State</h2>
          {/* นำข้อมูล "message" ใน State มาใช้ */}
          Message: {this.state.message}
          <div>
            <button onClick={this.handleMessageChange}>
              Change Message Hi.
            </button>
          </div>
        </div>

        <div>
          <h2>ตัวอย่าง Props</h2>
          {/* เรียกใช้ PersonComponent */}
          <PersonComponent name="Goku" power={1000} />
        </div>

        <div>
          {/**
            * Handling events
            * Event ของ Input
            * @see https://reactjs.org/docs/handling-events.html
            */
          }
          <h2>ตัวอย่าง Handling events</h2>
          textInput: <input onChange={this.handleTextChange} />
          <br />
          valueTextInput: {this.state.text}
          <br />
          radio:
          <input
            type="radio"
            onChange={() => {
              this.setState({ isTrue: true });
            }}
            checked={this.state.isTrue}
          />
          true
          <input
            type="radio"
            onChange={() => {
              this.setState({ isTrue: false });
            }}
            checked={!this.state.isTrue}
          />
          false
          <br />
          {this.state.isTrue ? "Good" : "Bad"}
        </div>
      </div>
    );
  }
}
