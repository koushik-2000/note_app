import { useEffect, useRef, useState } from "react";
import send_btn from "./assets/send.svg";
import back_btn from "./assets/back.svg";
import Modal from "./components/Modal";
import Note from "./components/Note";
import note_bg from "./assets/notes-background.svg";

const App = () => {
  const inputref = useRef();

  const [modal, setModal] = useState(false);

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("groups")) {
      if (groups.length > 0) {
        localStorage.setItem("groups", JSON.stringify(groups));
      }
      const group = localStorage.getItem("groups");
      setGroups(JSON.parse(group));
    } else {
      console.log(groups);
      localStorage.setItem("groups", JSON.stringify(groups));
    }
  }, [groups]);

  const [currGroup, setCurrGroup] = useState(null);

  const uploadNote = () => {
    const content = inputref.current.value;
    if (content === "") {
      return;
    }
    setGroups((prevGroups) => {
      return prevGroups.map((group) => {
        if (group.name === groups[currGroup].name) {
          const updatedGroup = { ...group };
          const newNote = {
            time: new Date().toLocaleString(),
            content: content,
          };
          updatedGroup.notes = [...group.notes, newNote];
          return updatedGroup;
        } else {
          return group;
        }
      });
    });
    inputref.current.value = "";
  };

  useEffect(() => {
    const root = document.querySelector("#root");
    if (currGroup === null) {
      root.style.setProperty("--display1", "block");
      root.style.setProperty("--display2", "none");
    } else {
      root.style.setProperty("--display1", "none");
      root.style.setProperty("--display2", "block");
    }
  }, [currGroup]);

  return (
    <div className="App container">
      <div className="left_section">
        <h1 className="header">Pocket Notes</h1>
        <div className="create_btn" onClick={() => setModal(true)}>
          + Create Notes Group
        </div>
        <div className="group_list">
          {groups?.map((group, index) => (
            <Group
              groups={groups}
              currGroup={currGroup}
              key={index}
              group={group}
              setCurrGroup={setCurrGroup}
              index={index}
            />
          ))}
        </div>
      </div>
      <div className="right_section">
        {currGroup !== null ? (
          <>
            <div className="group_header">
              <div className="back_btn" onClick={() => setCurrGroup(null)}>
                <img src={back_btn} alt="" />
              </div>
              <div
                className="group_avatar"
                style={{ background: groups[currGroup]?.color }}
              >
                {groups[currGroup]?.name?.slice(0, 2)}
              </div>
              <div className="group_heading">{groups[currGroup]?.name}</div>
            </div>
            <div className="notes_list">
              {groups[currGroup]?.notes?.map((note, index) => (
                <Note key={index} note={note} />
              ))}
            </div>
            <div className="input_box">
              <textarea
                ref={inputref}
                placeholder="Enter your text here..........."
              ></textarea>
              <div className="send_btn" onClick={() => uploadNote()}>
                <img src={send_btn} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="blank_templete">
            <img src={note_bg} alt="note_bg" />
            <h1>Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </div>
        )}
      </div>
      {modal && (
        <Modal
          setModal={setModal}
          modal={modal}
          setGroups={setGroups}
          groups={groups}
        />
      )}
    </div>
  );
};

export default App;

const Group = ({ currGroup, group, groups, setCurrGroup, index }) => (
  <div
    className={`group ${
      groups[currGroup]?.name === group.name ? "active" : null
    }`}
    onClick={() => {
      setCurrGroup(index);
    }}
  >
    <div className="avatar" style={{ background: group.color }}>
      {group.name.slice(0, 2)}
    </div>
    <div className="group_name">{group.name}</div>
  </div>
);
