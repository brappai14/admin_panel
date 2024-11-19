import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

const ManageSpace = () => {
  const [boxes, setBoxes] = useState([]);
  const [inputNumber, setInput] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const storedPosition = localStorage.getItem("dragPosition");
    if (storedPosition) {
      setPosition(JSON.parse(storedPosition));
    }

    // const storedBoxes = localStorage.getItem("boxes");
    // if (storedBoxes) {
    //   setBoxes(JSON.parse(storedBoxes));
    // }
  }, []);

  const handleInputChange = (e) => {
    setInput(parseInt(e.target.value));
  };

  const addBox = () => {
    let result = Array.from({ length: inputNumber }, (_, index) => index + 1);
    setBoxes(result);
  };

  const handleDrag = (e, ui) => {
    setPosition({ x: ui.x, y: ui.y });
  };

  const handleStop = () => {
    // localStorage.setItem("dragPosition", JSON.stringify(position));
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <input
              type="number"
              value={inputNumber}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter number of boxes"
            />
          </div>
          <div className="col-md-4">
            <button onClick={addBox} className="btn btn-primary">
              Add Box
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col mt-5">
            <h5>Draggable Boxes</h5>
            <div class="card mt-3">
              <div class="card-body">
                <div
                  className="d-flex flex-wrap">
                  {boxes.map((box, index) => (
                    <Draggable
                      defaultPosition={{ x: position.x, y: position.y }}
                      onStop={handleStop}
                      onDrag={handleDrag}
                      key={index}
                    >
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          backgroundColor: "lightblue",
                          margin: 10,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Box {box}
                      </div>
                    </Draggable>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSpace;
